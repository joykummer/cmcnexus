from django.db import models


class Organisation_Category(models.Model):

    CATEGORY_CHOICES = (
        (0, "Undefined"),
        (1, "Medical"),
        (2, "Administrative"),
        (3, "Logistics"),
    )

    id = models.IntegerField(
        choices=CATEGORY_CHOICES,
        default=0,
        primary_key=True
    )

    def __str__(self):
        return dict(self.CATEGORY_CHOICES)[self.id]
