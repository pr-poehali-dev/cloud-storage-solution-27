import json
import os
import boto3

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

    # flat=true — без delimiter, все файлы + автосбор папок
    flat = params.get('flat', 'false') == 'true'
    if flat:
        paginator = s3.get_paginator('list_objects_v2')
        photos = []
        folders_set = set()
        for page in paginator.paginate(Bucket='files', Prefix=prefix):
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

    result = s3.list_objects_v2(Bucket='files', Prefix=prefix, Delimiter='/')
    folders = [cp['Prefix'] for cp in result.get('CommonPrefixes', [])]
    photos = []
    all_keys = []
    for obj in result.get('Contents', []):
        key = obj['Key']
        all_keys.append(key)
        if key.lower().endswith(image_exts):
            photos.append({'key': key, 'url': f"{cdn_base}/{key}", 'size': obj['Size']})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'prefix': prefix, 'folders': folders, 'photos': photos, 'all_keys': all_keys, 'truncated': result.get('IsTruncated', False)}),
    }