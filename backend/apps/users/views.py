from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from apps.users.permissions import IsOwnUser
from apps.users.serializer import FullUserSerializer

User = get_user_model()


class RetrieveLoggedInUser(RetrieveUpdateAPIView):
    queryset = User.objects.none()
    serializer_class = FullUserSerializer
    permission_classes = [IsAuthenticated, IsOwnUser]

    def get_object(self):
        return self.request.user
