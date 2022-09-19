from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
# from rest_framework.test import RequestsClient

from rest_framework.authtoken.models import Token
from complaint_app.models import User

client = APIClient()

# user = User.objects.get(username='aadams')
token = Token.objects.get(user__username='mchin')
client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

response = client.get('http://127:0.0.1:8000/api/complaints/')
response.render() # Render to access response.content
print(response.content)

client.logout()

assert response.status_code == 200
