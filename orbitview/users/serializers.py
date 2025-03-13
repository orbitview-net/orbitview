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
                  'byline',
                  'profile_pic',
                  'membership',
                  'website',
                  'linkedin',
                  'external_links',
        ]


class ComprehensiveOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'id',
            'title',
            'logo',
            'slogan',
            'slug',
            'description',
            'website',
            'external_links',
            'type'
        ]

class SimpleOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = [
            'id',
            'title',
            'logo',
            'slogan',
            'slug',
            'description',
            'website',
            'type'
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    company = SimpleOrganizationSerializer()

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
                  'byline',
                  'profile_pic',
                  'membership',
                  'website',
                  'linkedin',
                  'external_links',
                  'experiences'
        ]