from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

from datetime import date

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  # serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()
  
  def list(self, request):
    # Get all complaints from the user's district
    serializer = ComplaintSerializer(self.queryset, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  
  # Open complaints: Current date is gte opendate and lte closedate
  current_date = date.today()
  queryset = Complaint.objects.filter(
    opendate__lte=current_date
  ).filter(
    closedate__gte=current_date
  )
  
  def list(self, request):
    # Get only the open complaints from the user's district
    serializer = ComplaintSerializer(self.queryset, many=True)
    return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    # Get only complaints that are close from the user's district
    # Closed complaints: closedate is less than current date
    # By default, closedate should be greater than opendate
    # Request should pass user's district?
    
    # closed_complaints = Complaint.objects.get(
    #   district__exact=0
    # ).filter(
    #   closedate__lt=date.today()
    # )
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response()