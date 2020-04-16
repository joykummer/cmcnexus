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
    categories = models.ManyToManyField(
        to=Category,
        related_name='organisations',
        default=0
    )
    tag = models.CharField(
        max_length=100,
        blank=True
    )


    def __str__(self):
        return self.name
