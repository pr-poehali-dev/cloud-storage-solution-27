import json
import os
import smtplib
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders


def handler(event: dict, context) -> dict:
    """Отправляет заявку участника фестиваля на почту организаторов lukidebut@mail.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    city = body.get("city", "").strip()
    about = body.get("about", "").strip()
    poems = body.get("poems", "").strip()
    file_name = body.get("file_name", "")
    file_data = body.get("file_data", "")

    if not name or not email:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и email обязательны"}),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    sender = "lukidebut@mail.ru"
    recipient = "lukidebut@mail.ru"

    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = f"Заявка на участие в фестивале — {name}"

    text_body = f"""Новая заявка на участие в фестивале «А музы не молчат!»

Имя и фамилия: {name}
Email: {email}
Город / регион: {city}

Краткая информация об участнике:
{about}

Стихотворения / вопрос:
{poems}
"""
    msg.attach(MIMEText(text_body, "plain", "utf-8"))

    if file_data and file_name:
        file_bytes = base64.b64decode(file_data)
        part = MIMEBase("application", "octet-stream")
        part.set_payload(file_bytes)
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f'attachment; filename="{file_name}"')
        msg.attach(part)

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }
