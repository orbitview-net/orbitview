from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    MEMBERSHIP_TYPES = [
        ("C", "Creator"),
        ("L", "Learner"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    date_of_birth = models.DateField()
    membership = models.CharField(max_length=1, choices=MEMBERSHIP_TYPES)
    website = models.URLField(max_length=2083, null=True, blank=True) # for their personal website
    linkedin = models.URLField(max_length=2083, null=True, blank=True)
    external_links = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.user.email}"


class Organization(models.Model):
    title = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company-logos')
    description = models.TextField(max_length=2000)
    website = models.URLField(max_length=2083, null=True, blank=True)  # for their organization website
    external_links = models.JSONField(null=True, blank=True)


