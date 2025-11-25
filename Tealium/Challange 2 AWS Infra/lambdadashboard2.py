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

        # 2. Sort by last modified (newest first)
        # OLD CODE: ... reverse=True)[:10]  <-- The limit was here
        # NEW CODE: remove the slice to get everything
        sorted_files = sorted(response['Contents'], key=lambda x: x['LastModified'], reverse=True)

        # Optional: If you have 1000s of files, you might want to limit it to 100 to prevent timeouts
        # sorted_files = sorted_files[:100] 

        # 3. Loop through and read the actual JSON content
        dashboard_data = []
        for file in sorted_files:
            try:
                file_obj = s3.get_object(Bucket=BUCKET_NAME, Key=file['Key'])
                file_content = json.loads(file_obj['Body'].read().decode('utf-8'))
                dashboard_data.append(file_content)
            except Exception as read_error:
                print(f"Skipping file {file['Key']}: {read_error}")
                continue

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