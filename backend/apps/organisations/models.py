from django.db import models

from apps.categories.models import Category


class Organisation(models.Model):
    name = models.CharField(
        max_length=100
    )
    description = models.TextField(
        max_length=500
    )
    services = models.TextField(
        max_length=500
    )
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='organisations',
        default=0
    )
    tag = models.CharField(
        max_length=100,
        blank=True
    )
    members = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name
