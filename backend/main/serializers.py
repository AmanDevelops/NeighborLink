from django.contrib.auth.models import User
from main.models import Category, Notice
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        return user


class NoticeSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta:
        model = Notice
        fields = ["id", "title", "created_at", "category", "user"]

    def __init__(self, *args, **kwargs):
        super(NoticeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request:
            filter_param = request.query_params.get("filter")
            if filter_param:
                self.context["category_id"] = filter_param


class SingleNoticeSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta:
        model = Notice
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(SingleNoticeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request:
            filter_param = request.query_params.get("id")
            if filter_param:
                self.context["id"] = filter_param