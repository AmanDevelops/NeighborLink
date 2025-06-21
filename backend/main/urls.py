from django.urls import path
from main.views import *
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("auth/signup", RegisterView.as_view(), name="signup"),
    path("auth/login", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("items", CategoryList.as_view()),
]
