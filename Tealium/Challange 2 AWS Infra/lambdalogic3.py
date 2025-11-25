import json
import boto3
import time

# Initialize S3 client outside the handler for warm-start performance
s3 = boto3.client('s3')

def lambda_handler(event, context):
    # --- STEP 1: DATA SOURCE (Simulating a DB lookup) ---

    print("Full event:", event) #adding error handling
    title_map = {
        "al rivera": "Principal SCE",
        "sarah smith": "Sr. SCE",
        "nedim dragic": "Director SCE",
        "ilya osovets": "SCE - Hired!"
    }

    # --- STEP 2: PARSE INPUT & METADATA ---
    # Unpack the body
    try:
        body = json.loads(event.get('body', '{}')) if isinstance(event.get('body'), str) else event
        raw_name = body.get('name', '').strip()
    except Exception as e:
        return build_response(400, "Invalid JSON")

    # Capture Metadata (Audit Trail)
    # API Gateway passes headers and request context. We extract them here.
    headers = event.get('headers', {})
    request_context = event.get('requestContext', {})
    identity = request_context.get('identity', {})

    # REST API Gateway usually puts IP in identity -> sourceIp
    ip_address = identity.get('sourceIp') or headers.get('X-Forwarded-For') or 'Unknown IP'
    
    # User Agent (Browser Info) is in headers
    user_agent = headers.get('User-Agent') or headers.get('user-agent') or 'Unknown Browser'

    # --- STEP 3: BUSINESS LOGIC (Enrichment) ---
    if not raw_name:
        return build_response(400, "Name is required")

    # Normalize input for lookup
    title = title_map.get(raw_name.lower())

    # Handle "Not Found" scenario
    if not title:
        print(f"Lookup failed for: {raw_name} from IP: {ip_address}") 
        return build_response(404, "Error! No Person found")

    # --- STEP 4: PERSISTENCE (Save to S3) ---
    bucket_name = 'tealium-submissions-s3'
    file_name = f"{raw_name.replace(' ', '_')}_{int(time.time())}.json"
    
    # Create the enriched payload with Audit Data
    data_payload = {
        "name": raw_name,
        "title": title,
        "timestamp": int(time.time()),
        "meta": {
            "ip_address": ip_address,
            "browser": user_agent
        }
    }

    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=json.dumps(data_payload, indent=2), # Indent makes the file easier to read for humans
            ContentType='application/json'
        )
    except Exception as e:
        print(f"S3 Write Error: {e}")
        return build_response(500, "Storage failure")

    # --- STEP 5: RESPONSE --- 
    return build_response(200, "Success", data_payload)

# Helper function to handle CORS and formatting
def build_response(status_code, message, data=None):
    body = {"message": message}
    if data: body["data"] = data
    
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" # Required for frontend fetch
        },
        "body": json.dumps(body)
    }