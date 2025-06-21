from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()


class Notice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_flagged = models.BooleanField(default=False)


class MediaAttachment(models.Model):
    notice = models.ForeignKey(Notice, on_delete=models.CASCADE)
    file_url = models.URLField()
    FILE_TYPE_CHOICES = [
        ("image", "Image"),
        ("video", "Video"),
        ("document", "Document"),
    ]
    file_type = models.CharField(max_length=50, choices=FILE_TYPE_CHOICES)
    uploaded_at = models.DateTimeField(default=timezone.now)


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)
