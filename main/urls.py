from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("callback", views.handle_social_auth, name="callback"),
    path("logout", views.logout_user, name="logout"),
]
