from complaint_app.models import Complaint, User, UserProfile

import datetime

complaints = Complaint.objects.all()

today = datetime.date.today() - datetime.timedelta(days=365*7)

# print(today)

# print(len(complaints.filter(
#   closedate__isnull=True
# )))