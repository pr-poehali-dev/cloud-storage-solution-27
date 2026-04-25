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

    # debug=true — диагностика: пробуем разные бакеты и префиксы
    if params.get('debug') == 'true':
        debug_info = {'access_key': access_key}
        for bucket_name in ['files', 'bucket', 'photos', 'media', 'storage']:
            try:
                r = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=5)
                keys = [o['Key'] for o in r.get('Contents', [])]
                debug_info[bucket_name] = {'count': r.get('KeyCount', 0), 'keys': keys}
                # Пробуем с префиксом access_key
                r2 = s3.list_objects_v2(Bucket=bucket_name, Prefix=access_key + '/', MaxKeys=5)
                keys2 = [o['Key'] for o in r2.get('Contents', [])]
                debug_info[bucket_name + '_with_prefix'] = {'count': r2.get('KeyCount', 0), 'keys': keys2}
            except Exception as e:
                debug_info[bucket_name] = {'error': str(e)}
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, 'body': json.dumps(debug_info)}

    # flat=true — без delimiter, все файлы + автосбор папок
    flat = params.get('flat', 'false') == 'true'
    if flat:
        paginator = s3.get_paginator('list_objects_v2')
        photos = []
        all_keys = []
        folders_set = set()
        for page in paginator.paginate(Bucket='bucket', Prefix=prefix):
            for obj in page.get('Contents', []):
                key = obj['Key']
                all_keys.append(key)
                rel = key[len(prefix):]
                if '/' in rel:
                    folders_set.add(prefix + rel.split('/')[0] + '/')
                if key.lower().endswith(image_exts) or not '.' in key.split('/')[-1]:
                    photos.append({'key': key, 'url': f"{cdn_base}/{key}", 'size': obj['Size']})
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'prefix': prefix, 'folders': sorted(folders_set), 'photos': photos, 'all_keys': all_keys[:50]}),
        }

    result = s3.list_objects_v2(Bucket='bucket', Prefix=prefix, Delimiter='/')
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