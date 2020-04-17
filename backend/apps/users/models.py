from django.contrib.auth.models import AbstractUser
from django.db import models
from guardian.mixins import GuardianUserMixin

from apps.organisations.models import Organisation


class User(GuardianUserMixin, AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)
    department = models.CharField(
        verbose_name='department',
        max_length=200,
        blank=True,
        null=True
    )
    phone = models.CharField(
        verbose_name='phone',
        max_length=20,
        blank=True,
        null=True
    )
    roles = models.CharField(
        verbose_name='roles',
        max_length=200,
        blank=False,
        null=True
    )
    organisation = models.ForeignKey(
        to=Organisation,
        related_name="member",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str__(self):
        return f'User {self.id}: {self.username}'
