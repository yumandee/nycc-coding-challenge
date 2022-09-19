from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
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
    print('testing')
    if not request.user.is_authenticated:
      return Response(status=404)

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
    # Check if user is authenticated
    if not request.user.is_authenticated:
      return Response(status=404)

    user = request.user
    userProfile = UserProfile.objects.filter(user=user)[0]
    print(userProfile)
    # Open complaints: Complaints that have no closedate indicate complaints that are still open.
    openCases = self.queryset.filter(
      account__exact=formattedDistrict(userProfile.district)
    )
    print(openCases)
    # Get only the open complaints from the user's district
    serializer = ComplaintSerializer(openCases, many=True)
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