from django.contrib import admin
from .models import Profile, Organization, Experience

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1  # Number of empty forms to display

class ProfileAdmin(admin.ModelAdmin):
    inlines = [ExperienceInline]

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Organization)

