from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from apps.authentication.views import UpdateLastLoginTokenObtainPairView

urlpatterns = [
    path('', UpdateLastLoginTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', jwt_views.TokenVerifyView.as_view(), name='token_refresh')
]
