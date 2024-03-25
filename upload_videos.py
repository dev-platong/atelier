import os
import boto3
from dotenv import load_dotenv
load_dotenv()

# ファイルが保存されているローカルディレクトリのパス
local_directory = 'player'
# アップロード先のS3バケット名
bucket_name = os.getenv('S3_BUCKET_NAME')
# S3サービスを使用するためのboto3 clientを作成します
s3_client = boto3.client('s3')

def upload_files(path):
    parent_directory = os.path.dirname(path)
    for subdir, dirs, files in os.walk(path):
        for file in files:
            full_path = os.path.join(subdir, file)
            with open(full_path, 'rb') as data:
                s3_path = os.path.join(os.path.relpath(subdir, parent_directory), file)
                s3_client.upload_fileobj(data, bucket_name, s3_path)
                print(f'Uploaded {file} to {s3_path}')

upload_files(local_directory)
