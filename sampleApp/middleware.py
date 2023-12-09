# middleware.py

from django.http import HttpResponseRedirect
from django.urls import reverse

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated and request.path != reverse('sign_in'):
            return HttpResponseRedirect(reverse('sign_in'))

        response = self.get_response(request)
        return response
