import json
import boto3

s3 = boto3.client('s3')
BUCKET_NAME = 'tealium-submissions-s3'

def lambda_handler(event, context):
    try:
        # 1. List objects in the bucket
        response = s3.list_objects_v2(Bucket=BUCKET_NAME)
        if 'Contents' not in response:
            return build_response(200, [])

        # 2. Sort by last modified (newest first) and take top 10
        sorted_files = sorted(response['Contents'], key=lambda x: x['LastModified'], reverse=True)[:10]

        # 3. Loop through and read the actual JSON content
        dashboard_data = []
        for file in sorted_files:
            file_obj = s3.get_object(Bucket=BUCKET_NAME, Key=file['Key'])
            file_content = json.loads(file_obj['Body'].read().decode('utf-8'))
            dashboard_data.append(file_content)

        return build_response(200, dashboard_data)

    except Exception as e:
        print(e)
        return build_response(500, {"error": str(e)})

def build_response(code, body):
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(body)
    }