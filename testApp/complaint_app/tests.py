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
  