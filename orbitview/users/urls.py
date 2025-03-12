from django.urls import path
from . import views


urlpatterns = [
    path("all/", views.ProfileListView.as_view(), name="users-list"),
    path("<str:user__username>/", views.ProfileDetailView.as_view(), name="users-detail"),
]