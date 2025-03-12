from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Organization, Experience

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
                  'profile_pic',
                  'membership',
                  'website',
                  'linkedin',
                  'external_links'
        ]


class ComprehensiveOrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'id',
            'logo',
            'description',
            'website',
            'external_links',
            'type'
        ]

class SimpleOrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'id',
            'logo',
            'description',
            'website',
            'type'
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    company = SimpleOrganizerSerializer()

    class Meta:
        model = Experience
        fields = ['title', 'type', 'employment_type', 'company', 'start_date', 'end_date']


class ResumeSerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['id',
                  'user',
                  'date_of_birth',
                  'profile_pic',
                  'membership',
                  'website',
                  'linkedin',
                  'external_links',
                  'experiences'
        ]