from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    MEMBERSHIP_TYPES = [
        ("C", "Creator"),
        ("L", "Learner"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    date_of_birth = models.DateField()
    profile_pic = models.ImageField(upload_to='profile_pics', default="/default_pfp.jpg")
    membership = models.CharField(max_length=1, choices=MEMBERSHIP_TYPES)
    website = models.URLField(max_length=2083, null=True, blank=True) # for their personal website
    linkedin = models.URLField(max_length=2083, null=True, blank=True)
    external_links = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.user.email}"


class Organization(models.Model):

    ORGANIZATION_TYPES = [
        ("CORP", "Corporation"),
        ("NONP", "Nonprofit"),
        ("CLUB", "Club"),
        ("STARTUP", "Startup"),
        ("GOV", "Government Agency"),
        ("EDU", "Educational Institution"),
        ("SMB", "Small Business"),
        ("FREELANCE", "Freelance/Independent"),
        ("PARTNER", "Partnership"),
        ("OSS", "Open Source Project"),
    ]

    title = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company-logos')
    description = models.TextField(max_length=2000)
    website = models.URLField(max_length=2083, null=True, blank=True)  # for their organization website
    external_links = models.JSONField(null=True, blank=True)
    type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES, default="CORP")

    def __str__(self):
        return self.title


class Experience(models.Model):
    EXPERIENCE_TYPES = [
        ("EDU", "Education"),
        ("CLUB", "Club"),
        ("WORK", "Work"),
    ]

    EMPLOYMENT_TYPES = [
        ("FULL_TIME", "Full-time"),
        ("PART_TIME", "Part-time"),
        ("CONTRACT", "Contract"),
        ("INTERNSHIP", "Internship"),
        ("FREELANCE", "Freelance"),
        ("SELF_EMPLOYED", "Self-employed"),
    ]

    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="experiences")
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=EXPERIENCE_TYPES)
    employment_type = models.CharField(max_length=15, choices=EMPLOYMENT_TYPES)
    description = models.TextField(max_length=2000, null=True, blank=True)
    company = models.ForeignKey(Organization, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True) # if null --> Present

