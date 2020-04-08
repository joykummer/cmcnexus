from django.urls import path

from .views import RetrieveLoggedInUser


urlpatterns = [
    path('me/', RetrieveLoggedInUser.as_view(), name='profile'),
]
