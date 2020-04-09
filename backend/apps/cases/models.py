from django.db import models
from django.contrib.auth import get_user_model

from apps.organisation.models import Organisation

User = get_user_model()


class Case(models.Model):

    GENDER_CHOICES = (
        (0, 'Female'),
        (1, 'Male'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    diagnosis = models.TextField()
    justification = models.TextField()
    recommendation = models.TextField()
    category = models.CharField(max_length=100)
    consent = models.BooleanField(default=False)
    age = models.CharField(max_length=50)
    sex = models.BooleanField(choices=GENDER_CHOICES, default=0)
    country = models.CharField(max_length=100)
    comments = models.TextField(blank=True, default='')
    outcome = models.CharField(max_length=100, blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, blank=True, default='')
    assigned_partners = models.ManyToManyField(
        to=Organisation,
        related_name='assigned_cases',
        blank=True,
        null=True
    )
    matched_partners = models.ManyToManyField(
        to=Organisation,
        related_name='matched_cases',
        blank=True,
        null=True
    )
    created_by = models.ForeignKey(
        to=User,
        related_name="cases_created",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return f'Case {self.id}: {self.title}'
