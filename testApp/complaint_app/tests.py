from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory, APIClient, force_authenticate, RequestsClient
from rest_framework.authtoken.models import Token

from .serializers import ComplaintSerializer
from .models import User, UserProfile, Complaint
from .views import OpenCasesViewSet, ComplaintViewSet, ClosedCasesViewSet

class ViewsTestCase(TestCase):
  def test_all_complaints_no_auth(self):
    """
    Test all complaints for an unauthenticated user.
    """      
    # Test getting from /api/complaints without logging in
  
    res = self.client.get('/api/complaints/')
    self.assertEqual(res.status_code, 401) # unauthenticated

    
  def test_all_complaints_single_digit_district(self):
    """
    Test all complaints for a user with a single digit district
    """
    user = User.objects.create_user(username='tuser', password='user-1')
    profile = UserProfile.objects.create(user=user, full_name='Test User', district='1')
    token = Token.objects.create(user=user)
    
    complaint1  = Complaint.objects.create(account='NYCC01')
    complaint2  = Complaint.objects.create(account='NYCC01')
    complaint3  = Complaint.objects.create(account='NYCC02')
    complaint4  = Complaint.objects.create(account='NYCC05')

    res = self.client.get('/api/complaints/', HTTP_AUTHORIZATION='Token ' + token.key)
        
    self.assertEqual(res.status_code, 200)
    
    

    

client = APIClient()
token = Token.objects.get(user__username='fcabrera')
client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
print(token)
# response = client.get('/api/complaints/openCases/')
# allOpen = True
# for case in response:
#   print(case)
#   # if case.closedate:
#   #   allOpen = False
  
# print(allOpen)

# # request = APIRequestFactory().get("http://127:0.0.1:8000/api/openCases/")
# # detail = OpenCasesViewSet.as_view({'get': 'list'})

# # user = User.objects.filter(username__exact='fcabrera')[0]
# # force_authenticate(request, user=user)
# response.render() # Render to access response.content
# print(response.content)
# # response = detail(request)
# # response.render()
# print(response.content)
# client.logout()

# # assert response.status_code == 200
