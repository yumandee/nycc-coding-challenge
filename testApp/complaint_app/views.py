from rest_framework import viewsets, status
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from collections import defaultdict
from django.shortcuts import get_object_or_404
# Create your views here.


"""
Single district numbers in UserProfile table are not padded by zero, but are padded in Complaint table.
FORMAT: NYCC##
@param dist: The district of the user
@return: The district formatted to match Complaint table
"""    
def formattedDistrict(dist):                
  dist = dist if len(dist) > 1 else '0' + dist # Add padded 0 if single digit
  
  # Append NYCC to match format
  return 'NYCC' + dist
class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()

  def list(self, request):
    user = request.user
    userProfile = UserProfile.objects.get(user=user)
    
    # Filter all complaints to the user's district
    complaints = self.queryset.filter(
      account__exact=formattedDistrict(userProfile.district)
    )
    
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.filter(
    closedate__isnull=True
  )
  def list(self, request):
    user = request.user
    userProfile = UserProfile.objects.get(user=user)
    # Open complaints: Complaints that have no closedate indicate complaints that are still open.
    openCases = self.queryset.filter(
      account__exact=formattedDistrict(userProfile.district)
    )
      
    # Get only the open complaints from the user's district
    serializer = ComplaintSerializer(openCases, many=True)
    return Response(serializer.data, status=200, headers={
      'Content-Type': 'application/json'
    })

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.filter(
    closedate__isnull=False
  )
  def list(self, request):
    # Get only complaints that are close from the user's district
    # Closed complaints: closedate exists

    user = request.user
    userProfile = UserProfile.objects.filter(user=user)[0]
    
    closedCases = self.queryset.filter(
      account__exact=formattedDistrict(userProfile.district)
    )
    
    serializer = ComplaintSerializer(closedCases, many=True)
    if serializer.data == []:
      return Response(serializer.data, status=204)
    return Response(serializer.data, status=200)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.exclude(
    complaint_type__isnull=True
  ).exclude(
    complaint_type=""
  )
  
  types = defaultdict(int)
  
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    user = request.user
    userProfile = UserProfile.objects.get(user=user)
    complaints = self.queryset.filter(
      account__exact=formattedDistrict(userProfile.district)
    )
    
    # Record counts of all types of complaints
    for complaint in complaints:
      self.types[complaint.complaint_type] += 1
    
    # Sort by occurrences
    sorted_complaints = sorted(self.types, key=self.types.get, reverse=True)[:3]

    return Response(data=sorted_complaints)
  
class ConstituentComplaintsViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.exclude(
    council_dist__isnull=True
  ).exclude(
    council_dist=''
  )
  
  def list(self, request):
    user = request.user
    userProfile = UserProfile.objects.get(user=user)
    constituentComplaints = self.queryset.filter(
      council_dist=formattedDistrict(userProfile.district)
    )
    
    serializer = ComplaintSerializer(constituentComplaints, many=True)
    if serializer.data == []:
      return Response(serializer.data, status=204)
    
    return Response(serializer.data, status=200)
    
  