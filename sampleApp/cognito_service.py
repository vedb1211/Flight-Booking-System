import boto3
from decouple import config

AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")

# Initialize the Cognito client
client = boto3.client('cognito-idp', region_name='ap-south-1',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY)


USER_POOL_ID = 'ap-south-1_cbEKaaKOF'
CLIENT_ID = '614vvvrhoje2e1i4ttreq17sqk'

# Function to sign up a new user
def sign_up(username, password, email):
    try:
        response = client.sign_up(
            ClientId=CLIENT_ID,
            Username=username,
            Password=password,
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                },
            ]
        )
        return {'status': 'success', 'message': 'User registered successfully', 'data': response}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

 

# Function to sign in an existing user
def sign_in(username, password):
    try:
        response = client.initiate_auth(
            ClientId=CLIENT_ID,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password
            }
        )
        return {'status': 'success', 'message': 'User authenticated successfully', 'token': response.get("AuthenticationResult").get("IdToken")}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

