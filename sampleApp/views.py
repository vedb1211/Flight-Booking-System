import json
import numpy as np
from datetime import datetime
from django.shortcuts import redirect, render
from django.http import HttpResponse
from .cognito_service import sign_up, sign_in
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .dynamodb import add_transaction
from .flight_list import get_flights

def index(request):
    return render(request, 'sampleApp/index.html')

def booking_view(request):
    return render(request,'sampleApp/booking.html')

@csrf_exempt
def ticket_view(request):
    if request.method == "POST":
        try:
            deptDate = datetime.now().strftime('%Y-%m-%d')
            user = request.session.get('username')
            data = json.loads(request.body.decode('utf-8'))
            amt = data.get('amount')
            fid = data.get('flightid')

            print(data)            
            print(user, deptDate, amt, fid)
            add_transaction(username=user, flight_id=fid, amount=amt, date=deptDate)
        except json.JSONDecodeError as e:
            print("JSONDecodeError:", str(e))
    return render(request,'sampleApp/ticket.html')

# Django view to handle sign-up AJAX request
@csrf_exempt

def signup_view(request):

    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        username = body.get('username')
        email = body.get('email')
        password = body.get('password')
        resp = sign_up(username, password,email)
        return JsonResponse(resp)
    else:
        # Handle GET or other request methods here, if needed
        return render(request, 'sampleApp/signup.html')



# Django view to handle sign-in AJAX request
@csrf_exempt

def signin_view(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        username = body.get('username')
        password = body.get('password')
        token_resp = sign_in(username, password)

        # Check if the sign-in was successful
        if token_resp.get('status') == 'success':
            # Set the username in the session
            print(username)
            request.session['username'] = username

        return JsonResponse(token_resp)
    else:
        # Handle GET or other request methods here, if needed
        return render(request, 'sampleApp/signin.html')


@csrf_exempt
def flights_view(request):
        depart = request.POST.get("Origin")
        arrive = request.POST.get("Destination")
        date = request.POST.get("departure-date")
        ceiling = request.POST.get("priceRange")
        json_string = get_flights(arrive_city=arrive, depart_city=depart, dept_date=date, max_price=ceiling)['body']
        flights = json.loads(json_string)

        # Calculate the minimum and maximum prices from the flight data
        min_price=0
        max_price=11000

        request.session['flights_data'] = flights  # Store the flight data in the session
        request.session['min_price'] = min_price
        request.session['max_price'] = max_price

        return render(request, 'sampleApp/flights.html', {'flights': flights, 'min_price': min_price, 'max_price': max_price,})

