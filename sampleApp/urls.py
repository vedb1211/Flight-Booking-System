from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign_up/', views.signup_view, name='sign_up'),
    path('sign_in/', views.signin_view, name='sign_in'),
    path('flights/', views.flights_view, name='flights'),
    path('booking/',views.booking_view,name='booking'),
    path('ticket/',views.ticket_view,name='ticket'),
]
