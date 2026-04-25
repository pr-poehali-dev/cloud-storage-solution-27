import json
import os
import base64
import uuid
import boto3

BUCKET = 'bucket'
CDN_BASE_TPL = "https://cdn.poehali.dev/projects/{key}/bucket"

def handler(event: dict, context) -> dict:
    """Загружает фото в указанный альбом (папку) S3-хранилища."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    album = (body.get('album') or '').strip().strip('/')
    files = body.get('files') or []

    if not album:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'album required'})}
    if not files:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'files required'})}

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    cdn_base = CDN_BASE_TPL.format(key=access_key)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=access_key,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    uploaded = []
    errors = []
    for f in files:
        try:
            data = base64.b64decode(f['data'])
            ext = f.get('ext', 'jpg').lower().lstrip('.')
            file_id = str(uuid.uuid4())
            key = f"{album}/{file_id}.{ext}"
            s3.put_object(Bucket=BUCKET, Key=key, Body=data, ContentType=f.get('mime', 'image/jpeg'))
            uploaded.append({'key': key, 'url': f"{cdn_base}/{key}"})
        except Exception as e:
            errors.append({'name': f.get('name', '?'), 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'uploaded': uploaded, 'errors': errors}),
    }
