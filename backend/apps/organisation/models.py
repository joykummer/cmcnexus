from django.db import models


CATEGORY_CHOICES = (
    ("M", "Medical"),
    ("A", "Administrative"),
    ("L", "Logistics"),
)


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
    category = models.CharField(
        max_length=1,
        choices=CATEGORY_CHOICES,
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
