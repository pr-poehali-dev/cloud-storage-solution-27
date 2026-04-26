import json
import os
import base64
import uuid
import boto3

BUCKET = 'bucket'
CDN_BASE_TPL = "https://cdn.poehali.dev/projects/{key}/bucket"

TRANSLIT = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z',
    'и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
    'с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'sch',
    'ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
    'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'Yo','Ж':'Zh','З':'Z',
    'И':'I','Й':'J','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R',
    'С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Sch',
    'Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya',
}

def translit(s):
    return ''.join(TRANSLIT.get(c, c) for c in s)

def handler(event: dict, context) -> dict:
    """Загружает фото в указанный альбом (папку) S3-хранилища."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    raw_body = event.get('body') or '{}'
    is_base64 = event.get('isBase64Encoded', False)
    if is_base64:
        raw_body = base64.b64decode(raw_body).decode('utf-8')
    body = json.loads(raw_body)
    album = (body.get('album') or '').strip().strip('/')
    files = body.get('files') or []

    if not album:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'album required'})}
    if not files:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'files required'})}

    album_key = translit(album)
    print(f"[upload] album={album!r} album_key={album_key!r} files_count={len(files)}")

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
            key = f"{album_key}/{file_id}.{ext}"
            print(f"[upload] key={key!r} size={len(data)}")
            s3.put_object(Bucket=BUCKET, Key=key, Body=data, ContentType=f.get('mime', 'image/jpeg'))
            ls = s3.list_objects_v2(Bucket=BUCKET, Prefix=album_key + '/', MaxKeys=3)
            print(f"[upload] after put, contents: {[o['Key'] for o in ls.get('Contents', [])]}")
            uploaded.append({'key': key, 'url': f"{cdn_base}/{key}"})
        except Exception as e:
            print(f"[upload] ERROR: {e}")
            errors.append({'name': f.get('name', '?'), 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'uploaded': uploaded, 'errors': errors}),
    }
