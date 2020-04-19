from django.db import models
from django.contrib.auth import get_user_model

from apps.cases.models import Case

User = get_user_model()


class Comment(models.Model):
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(to=User, related_name="comment", on_delete=models.CASCADE)
    case = models.ManyToManyField(to=Case, related_name="comments")

    def __str__(self):
        return self.content
