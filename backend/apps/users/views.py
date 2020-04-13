from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveUpdateAPIView

from apps.helpers.permissions import CustomDjangoModelPermission
from apps.users.serializer import FullUserSerializer

User = get_user_model()


class RetrieveLoggedInUser(RetrieveUpdateAPIView):
    queryset = User.objects.none()
    serializer_class = FullUserSerializer
    permission_classes = [CustomDjangoModelPermission]

    def get_object(self):
        return self.request.user
