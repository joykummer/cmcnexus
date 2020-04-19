from rest_framework import serializers
from apps.users.serializer import FullUserSerializer
from apps.comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user = FullUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
