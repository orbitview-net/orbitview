from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer
from .pagination import ProfilePagination


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = ProfilePagination