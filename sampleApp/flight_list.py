import requests

def get_flights(arrive_city=None, depart_city=None, max_price=None, dept_date=None):
    """
    Sends an HTTP request to the Lambda function to get a list of flights.

    Args:
        arrive_city (str): The arrival city.
        depart_city (str): The departure city.
        min_price (float): The minimum price of the flight.
        max_price (float): The maximum price of the flight.
        route (str): The route of the flight.

    Returns:
        list[dict]: A list of flights.
    """

    url = 'https://n9su3xy4pg.execute-api.ap-south-1.amazonaws.com/demoStage'
    payload = {
        'arrive': arrive_city,
        'depart': depart_city,
        'max_price': max_price,
        'dept_date': dept_date,
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        return response.json()
    else:
        raise Exception('Failed to get flights: {}'.format(response.status_code))
