import boto3, string, random
from decouple import config

AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")

def add_transaction(username, flight_id, amount, date):
    # Create a DynamoDB client
    dynamodb = boto3.client('dynamodb', region_name='ap-south-1',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    # Define the table name for your transactions table
    table_name = 'transactions'

    while True:
        # Generate a random 6-digit bill number
        digits = string.digits  # '0123456789'
        bill_number = ''.join(random.choice(digits) for _ in range(6))

        # Check if the generated bill number already exists in the table
        response = dynamodb.get_item(TableName=table_name, Key={'Bill Number': {'S': bill_number}})
        
        if 'Item' not in response:
            # If the bill number doesn't exist, it's unique
            break

    # Create an item to put into the 'Transactions' table
    transaction_item = {
        'Bill Number': {'S': bill_number},
        'Amount': {'S': str(amount)},
        'Date': {'S': date},
        'FlightID': {'S': flight_id},
        'Username': {'S': username}
        }

    # Create a put_item request
    put_item_request = {
        'TableName': table_name,
        'Item': transaction_item
    }

    # Execute the put_item request to add the transaction to the table
    dynamodb.put_item(**put_item_request)