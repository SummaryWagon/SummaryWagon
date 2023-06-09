import boto3
from decouple import config
import requests
import io

S3_ACCESS_KEY_ID = config("S3_ACCESS_KEY_ID")
S3_SECRET_ACCESS_KEY = config("S3_SECRET_ACCESS_KEY")
BUCKET_NAME = config("BUCKET_NAME")
RESIZED_BUCKET_NAME = config("RESIZED_BUCKET_NAME")

# Connect to S3 
s3_client = boto3.client(
    's3',
    aws_access_key_id = S3_ACCESS_KEY_ID,
    aws_secret_access_key = S3_SECRET_ACCESS_KEY
)

# upload file to s3 and resizing 
def upload_to_s3(og_title, og_image, extension):
    try:
        response = requests.get(og_image)
        response.raise_for_status()
        
        # upload_fileobj parameter setting
        image_url = io.BytesIO(response.content)
        bucket_name = BUCKET_NAME
        object_name = og_title + "." + extension # 파일명에 확장자 추가
        
        s3_client.upload_fileobj(
            image_url,   # image content 
            bucket_name,
            object_name
        )
        
        print('Image uploaded to S3 successfully')
        
        return object_name
        
    except Exception as e:
        print(f"Image Upload to S3 Error Occured : {e}")
        
def download_from_s3(image_title):
    try:
        response = s3_client.get_object(
            Bucket=RESIZED_BUCKET_NAME,
            Key='resized-'+image_title)
        
        object_body = response.get('Body')
        content = object_body.read()
        resized_image = io.BytesIO(content)
        
        print(resized_image)
        
        return resized_image
        
    except Exception as e:
        print(f"Image Download to S3 Error Occured : {e}")
        