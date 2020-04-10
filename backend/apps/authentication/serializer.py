from django.contrib.auth import user_logged_in

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class JWTSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        user_logged_in.send(sender=self.user.__class__, request=self.context['request'], user=self.user)

        return data
