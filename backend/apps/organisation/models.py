from django.db import models

from apps.organisation_category.models import Category_Organisation


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
        to=Category_Organisation,
        on_delete=models.CASCADE,
        related_name='organisations',
        default="undefined"
    )
    tag = models.CharField(
        max_length=100
    )
    accept = models.BooleanField(
        blank=True,
        null=True
    )
    assigned_cases = models.CharField(
        max_length=100,
        null=True
    )
    matched_cases = models.CharField(
        max_length=100,
        null=True
    )
    members = models.CharField(
        max_length=100,
        null=True
    )

    def __str__(self):
        return self.name
