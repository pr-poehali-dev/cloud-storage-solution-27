import json
import os
import boto3

BUCKET = 'bucket'

def handler(event: dict, context) -> dict:
    """Возвращает список фото из указанной папки S3-хранилища."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    params = event.get('queryStringParameters') or {}
    prefix = params.get('prefix', '')

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    cdn_base = f"https://cdn.poehali.dev/projects/{access_key}/bucket"
    image_exts = ('.jpg', '.jpeg', '.png', '.gif', '.webp')

    # flat=true — все файлы без разбивки по папкам
    flat = params.get('flat', 'false') == 'true'
    if flat:
        paginator = s3.get_paginator('list_objects_v2')
        photos = []
        folders_set = set()
        for page in paginator.paginate(Bucket=BUCKET, Prefix=prefix):
            for obj in page.get('Contents', []):
                key = obj['Key']
                rel = key[len(prefix):]
                if '/' in rel:
                    folders_set.add(prefix + rel.split('/')[0] + '/')
                if key.lower().endswith(image_exts):
                    photos.append({'key': key, 'url': f"{cdn_base}/{key}", 'size': obj['Size']})
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'prefix': prefix, 'folders': sorted(folders_set), 'photos': photos}),
        }

    paginator = s3.get_paginator('list_objects_v2')
    photos = []
    folders_set = set()
    for page in paginator.paginate(Bucket=BUCKET, Prefix=prefix, Delimiter='/'):
        print(f"[list] page keys={[o['Key'] for o in page.get('Contents', [])]} prefixes={page.get('CommonPrefixes', [])}")
        for cp in page.get('CommonPrefixes', []):
            folders_set.add(cp['Prefix'])
        for obj in page.get('Contents', []):
            key = obj['Key']
            if key.lower().endswith(image_exts):
                photos.append({'key': key, 'url': f"{cdn_base}/{key}", 'size': obj['Size']})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'prefix': prefix, 'folders': sorted(folders_set), 'photos': photos}),
    }