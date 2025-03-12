from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            # 'email',
            'date_joined',
        ]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer() # serializers.StringRelatedField(read_only=True)  # Returns the username instead of ID

    class Meta:
        model = Profile
        fields = ['id',
                  'user',
                  'date_of_birth',
                  'membership',
                  'website',
                  'linkedin',
                  'external_links'
        ]
