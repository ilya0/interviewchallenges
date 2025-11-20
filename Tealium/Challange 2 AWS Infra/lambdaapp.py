import json
import boto3
import time

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # 1. Define mapping (The Database)
    title_map = {
        "al rivera": "Principal SCE",
        "sarah smith": "Sr. SCE",
        "nedim dragic": "Director SCE"
    }

    print("Event Received:", json.dumps(event))

    try:
        # Handle parsing of the body
        if 'body' in event and event['body']:
            if isinstance(event['body'], str):
                body = json.loads(event['body'])
            else:
                body = event['body']
        else:
            body = event
            
        raw_name = body.get('name', '').strip()
        
    except Exception as e:
        print(f"Parsing Error: {e}")
        return response(400, "Invalid JSON format")

    if not raw_name:
        return response(400, "Please enter a name")

    # 2. Lookup Title
    name_key = raw_name.lower()
    title = title_map.get(name_key)

    # 3. Handle "Not Found" Scenario
    if not title:
        # If name is not in our list, return 404 immediately.
        # We do NOT save to S3 to keep the bucket clean of invalid data.
        return response(404, "Error! No Person found")

    # 4. S3 Storage (Only happens if person exists)
    bucket_name = 'tealium-submissions-s3' 
    timestamp = int(time.time())
    # Sanitize filename (replace spaces with underscores)
    file_name = f"{raw_name.replace(' ', '_')}_{timestamp}.json"
    
    s3_data = {
        "name": raw_name,
        "title": title,
        "timestamp": timestamp
    }

    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=json.dumps(s3_data),
            ContentType='application/json'
        )
    except Exception as e:
        print(f"S3 Error: {e}")
        return response(500, f"Failed to save to S3: {str(e)}")

    return response(200, "Success", {"name": raw_name, "title": title})

def response(code, message, data=None):
    body = {"message": message}
    if data:
        body["data"] = data
        
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        },
        "body": json.dumps(body)
    }