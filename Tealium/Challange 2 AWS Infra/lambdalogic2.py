import json
import boto3
import time

# Initialize S3 client outside the handler for warm-start performance just incase this function gets used again
s3 = boto3.client('s3')

def lambda_handler(event, context):
    # --- STEP 1: DATA SOURCE (Simulating a DB lookup) ---
    title_map = {
        "al rivera": "Principal SCE",
        "sarah smith": "Sr. SCE",
        "nedim dragic": "Director SCE",
        "ilya osovets": "SCE - Hired!"
    }

    # --- STEP 2: PARSE INPUT ---
    # API Gateway Proxy Integration sends the body as a string, unpack and make it a dictionary. json.loads converts it back to a string
    try:
        body = json.loads(event.get('body', '{}')) if isinstance(event.get('body'), str) else event
        raw_name = body.get('name', '').strip() #remove trailing and leading whitespaces and save as raw_name
    except Exception as e:
        return build_response(400, "Invalid JSON")

    # --- STEP 3: BUSINESS LOGIC (Enrichment) ---
    # of there is no name return 400 error, bad request client side error
    if not raw_name:
        return build_response(400, "Name is required")

    # Normalize input for lookup, convert uppercase to lowercase to compare to the data
    title = title_map.get(raw_name.lower())

    # Handle "Not Found" scenario (Clean Error Handling)
    if not title:
        print(f"Lookup failed for: {raw_name}") # Log to CloudWatch
        return build_response(404, "Error! No Person found")

    # --- STEP 4: PERSISTENCE (Save to S3) ---
    bucket_name = 'tealium-submissions-s3'
    file_name = f"{raw_name.replace(' ', '_')}_{int(time.time())}.json"
    
    data_payload = {
        "name": raw_name,
        "title": title, # Enriched data from the fake database
        "timestamp": int(time.time()) #add a timestamp
    }
#try catch to create a json document and save the details of the name thing with enrichment
    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=json.dumps(data_payload),
            ContentType='application/json'
        )
    except Exception as e:
        print(f"S3 Write Error: {e}")
        return build_response(500, "Storage failure")

    # --- STEP 5: RESPONSE --- 
    # return response ok, success, and also return the name and the title from the fake DB
    return build_response(200, "Success", {"name": raw_name, "title": title})

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