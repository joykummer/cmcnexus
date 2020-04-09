from django.db import models


class Category_Organisation(models.Model):

    CATEGORY_CHOICES = (
        ("U", "Undefined"),
        ("M", "Medical"),
        ("A", "Administrative"),
        ("L", "Logistics"),
    )

    name = models.CharField(
        max_length=1,
        choices=CATEGORY_CHOICES,
        default="U"
    )
