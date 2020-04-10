from django.db import models

from apps.organisation_category.models import Organisation_Category


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
        to=Organisation_Category,
        on_delete=models.CASCADE,
        related_name='organisations',
        default=0
    )
    tag = models.CharField(
        max_length=100
    )
    accept = models.BooleanField(
        blank=True,
        null=True
    )
    members = models.CharField(
        max_length=100,
        null=True
    )

    def __str__(self):
        return self.name
