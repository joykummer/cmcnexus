from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from apps.authentication.serializer import JWTSerializer


class UpdateLastLoginTokenObtainPairView(TokenObtainPairView):

    serializer_class = JWTSerializer
