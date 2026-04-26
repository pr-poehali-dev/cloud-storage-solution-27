import json
import os
import base64
import uuid
import boto3

BUCKET = 'files'
CDN_BASE_TPL = "https://cdn.poehali.dev/projects/{key}/files"

def handler(event: dict, context) -> dict:
    """Загружает фото в указанный альбом (папку) S3-хранилища."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    raw_body = event.get('body') or '{}'
    is_base64 = event.get('isBase64Encoded', False)
    print(f"[upload] isBase64Encoded={is_base64} body_len={len(raw_body)}")
    if is_base64:
        raw_body = base64.b64decode(raw_body).decode('utf-8')
    body = json.loads(raw_body)
    album = (body.get('album') or '').strip().strip('/')
    files = body.get('files') or []
    print(f"[upload] album={album!r} files_count={len(files)}")

    if not album:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'album required'})}
    if not files:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'files required'})}

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    cdn_base = CDN_BASE_TPL.format(key=access_key)
    print(f"[upload] access_key={access_key[:8]}...")

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=access_key,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    # ensure bucket exists
    try:
        s3.head_bucket(Bucket=BUCKET)
    except Exception:
        try:
            s3.create_bucket(Bucket=BUCKET)
            print(f"[upload] created bucket {BUCKET}")
        except Exception as e:
            print(f"[upload] create_bucket error: {e}")

    # list all buckets to debug
    try:
        buckets = s3.list_buckets()
        print(f"[upload] available buckets: {[b['Name'] for b in buckets.get('Buckets', [])]}")
    except Exception as e:
        print(f"[upload] list_buckets error: {e}")

    uploaded = []
    errors = []
    for f in files:
        try:
            data = base64.b64decode(f['data'])
            ext = f.get('ext', 'jpg').lower().lstrip('.')
            file_id = str(uuid.uuid4())
            key = f"{album}/{file_id}.{ext}"
            print(f"[upload] album={album!r} key={key!r} size={len(data)} mime={f.get('mime')}")
            s3.put_object(Bucket=BUCKET, Key=key, Body=data, ContentType=f.get('mime', 'image/jpeg'))
            # verify file exists
            head = s3.head_object(Bucket=BUCKET, Key=key)
            print(f"[upload] OK: {key} verified_size={head['ContentLength']}")
            # list bucket root to confirm
            ls = s3.list_objects_v2(Bucket=BUCKET, MaxKeys=5)
            print(f"[upload] bucket contents: {[o['Key'] for o in ls.get('Contents', [])]}")
            uploaded.append({'key': key, 'url': f"{cdn_base}/{key}"})
        except Exception as e:
            print(f"[upload] ERROR: {e}")
            errors.append({'name': f.get('name', '?'), 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'uploaded': uploaded, 'errors': errors}),
    }