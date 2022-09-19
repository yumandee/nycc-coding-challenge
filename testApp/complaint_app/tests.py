from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory, APIClient, force_authenticate, RequestsClient
from rest_framework.authtoken.models import Token
from .models import User, UserProfile, Complaint
from .views import OpenCasesViewSet, ComplaintViewSet, ClosedCasesViewSet

single_digit_user = Token.objects.get(user__username='mchin')
class ViewsTestCase(TestCase):
  def test_all_complaints_no_auth(self):
    """
    Test all complaints for a user with a single digit district (mchin)
    """      
    client = RequestsClient()
    # token = Token.objects.get(user__username='mchin')
    # client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    res = client.get('/api/complaints/')
    self.assertEqual(res.status_code, 401)
        
  def test_all_complaints_single_digit_district(self):
    """
    Test all complaints for a user with a single digit district (mchin)
    """
    client = RequestsClient()
    # token = Token.objects.get(user__username='mchin')
    client.credentials(HTTP_AUTHORIZATION='Token ' + single_digit_user.key)
    
    res = client.get('/api/complaints/')
    self.assertEqual(res.status_code, 200)

  # def test_all_complaints_double_digit_district(self):
  #   """
  #   Test all complaints for a user with a double digit district (aadams)
  #   """
  #   client = Client()
  #   client.login(username='aadams', password='Adams-28')

  #   res = client.get('/api/complaints/')
  #   self.assertEqual(res.status_code, 200)
    

    

# user = User.objects.get(username='aadams')
# token = Token.objects.get(user__username='fcabrera')
# client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

# response = client.get('http://127:0.0.1:8000/api/complaints/openCases/')
# # print(response)

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
