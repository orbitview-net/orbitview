from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import timedelta
from .models import Profile
from .serializers import *
from .pagination import ProfilePagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    pagination_class = ProfilePagination


class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ResumeSerializer # still works with the Profile model class
    lookup_field = 'user__username'


class OrganizationDetailView(generics.RetrieveAPIView):
    queryset = Organization.objects.all()
    serializer_class = ComprehensiveOrganizationSerializer # still works with the Profile model class
    lookup_field = 'slug'





class CustomLoginAPIView(APIView):

    permission_classes = []

    def post(self, request):

        print(request.data)

        username_or_email = request.data.get("username_or_email")
        password = request.data.get("password")
        save_info = request.data.get("save_info") # save login information? or not?

        # Check if the provided "username_or_email" is a username or an email
        user = None
        if '@' in username_or_email:  # It's an email
            user = User.objects.filter(email=username_or_email).first()
        else:  # It's a username
            user = User.objects.filter(username=username_or_email).first()

        if user is not None and user.check_password(password):
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # fetch the user who just logged in
            profile = get_object_or_404(Profile, user__username=user.username)
            serializer = ProfileSerializer(profile)
            
            response = JsonResponse({
                'message': "Login successful",
                'user_info': serializer.data,
            })

            print(response) # for testing purposes
            
            
            if save_info:
                print("Upon user request: Information is being saved")
                response.set_cookie(
                    'access_token',
                    refresh.access_token,
                    httponly=True,
                    secure=True,
                    samesite="Lax",
                    max_age=timedelta(days=1)
                )

                response.set_cookie(
                    'refresh_token',
                    str(refresh),
                    httponly=True,
                    secure=True,
                    samesite="Lax",
                    max_age=timedelta(days=7)
                )


            final_response = Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'logged_in_user': serializer.data,
                
            }, status=status.HTTP_200_OK)

            print({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'logged_in_user': serializer.data,
                
            }) # testing purposes ONLY'''

            return final_response
        
        print("Login FAILED!")
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
# No unauthorized user should generate a CSRF token
def csrf_token_view(request, format=None):
    return Response({'csrfToken': get_token(request)})