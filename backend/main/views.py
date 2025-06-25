from django.contrib.auth.models import User
from main.models import Category
from main.serializers import *
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []


class NoticeList(generics.ListCreateAPIView):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        queryset = Notice.objects.all()
        category = self.request.query_params.get("filter", None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]


class NoticeDetail(generics.ListAPIView):
    serializer_class = SingleNoticeSerializer

    def get_queryset(self):
        queryset = Notice.objects.all()
        notice_id = self.request.query_params.get("id", None)
        if notice_id is not None:
            queryset = queryset.filter(id=notice_id)
        else:
            queryset = queryset.none()  # If no id is passed, return empty queryset
        return queryset

    def get_permissions(self):
        return [AllowAny()]
