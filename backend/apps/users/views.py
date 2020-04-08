from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveUpdateAPIView
from apps.users.serializer import FullUserSerializer

User = get_user_model()


# GET / UPDATE logged in user profile
class RetrieveLoggedInUser(RetrieveUpdateAPIView):
    serializer_class = FullUserSerializer

    def get_object(self):
        return self.request.user
