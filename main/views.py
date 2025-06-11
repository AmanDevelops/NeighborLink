import json

import requests
from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect, render


def home(request):
    return render(
        request, "index.html", context={"client_id": settings.GOOGLE_CLIENT_ID}
    )


def handle_social_auth(request):
    code = request.GET.get("code")

    if code is None:
        return redirect("home")

    tokens = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "grant_type": "authorization_code",
        },
    )

    if not tokens.ok:
        return redirect("home")

    tokens = tokens.json()

    access_token = tokens.get("access_token")

    if not access_token:
        return redirect("home")

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    if not user_info.ok:
        return redirect("home")

    user_info = user_info.json()

    email = user_info.get("email")
    isVerified = user_info.get("email_verified")
    name = user_info.get("given_name") or user_info.get("name")
    picture = user_info.get("picture")

    if not email and isVerified:
        return redirect("home")

    user, created = User.objects.get_or_create(username=email.split("@")[0])
    user.email = email
    user.first_name = name or ""
    user.save()

    profile = getattr(user, "userprofile", None)
    if profile:
        profile.social_login = True
        profile.profile_url = picture
        profile.save()
    login(request, user)

    return redirect("home")


def logout_user(request):
    logout(request)
    return redirect("home")
