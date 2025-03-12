from rest_framework import generics
from .models import Profile
from .serializers import *
from .pagination import ProfilePagination


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = ProfilePagination


class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ResumeSerializer # still works with the Profile model class
    lookup_field = 'user__username'
