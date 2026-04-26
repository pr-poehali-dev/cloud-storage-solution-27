import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Возвращает список фото из БД по альбому."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    params = event.get('queryStringParameters') or {}
    prefix = params.get('prefix', '')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    with conn.cursor() as cur:
        if prefix:
            album = prefix.rstrip('/')
            cur.execute(
                f"SELECT key, url, size FROM {schema}.photos WHERE album = %s ORDER BY created_at DESC",
                (album,)
            )
        else:
            cur.execute(f"SELECT key, url, size FROM {schema}.photos ORDER BY created_at DESC")
        rows = cur.fetchall()

    conn.close()

    photos = [{'key': r[0], 'url': r[1], 'size': r[2]} for r in rows]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'prefix': prefix, 'folders': [], 'photos': photos}),
    }
