from django.db import models


class Case(models.Model):
    GENDER_CHOICES = (
        (0, 'Female'),
        (1, 'Male'),
    )

    title = models.CharField(max_length=160)
    description = models.TextField()
    diagnosis = models.TextField()
    justification = models.TextField()
    recommendation = models.TextField()
    category = models.CharField(max_length=200)
    consent = models.BooleanField(default=False)
    age = models.IntegerField(null=True)
    sex = models.BooleanField(choices=GENDER_CHOICES, default=0)
    country = models.CharField(max_length=150)
    comments = models.TextField(blank=True)
    outcome = models.CharField(max_length=160, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, blank=True)
    assigned_partners = models.CharField(max_length=100, blank=True)
    matched_partners = models.CharField(max_length=100, blank=True)
    created_by = models.CharField(max_length=100)

    def __str__(self):
        return f'Case {self.id}: {self.title}'

