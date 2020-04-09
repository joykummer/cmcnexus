from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    email = models.EmailField(unique=True)
    department = models.CharField(
        verbose_name='department',
        max_length=200,
        blank=True,
        null=True
    )

    first_name = models.CharField(
        verbose_name='first name',
        max_length=200,
        blank=True,
        null=True
    )

    last_name = models.CharField(
        verbose_name='last name',
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

    created = models.DateTimeField(
        verbose_name='created',
        auto_now_add=True,
        null=True
    )

    roles = models.CharField(
        verbose_name='roles',
        max_length=200,
        blank=False,
        null=True
    )

    organisation = models.CharField(
        verbose_name='organisation',
        max_length=200,
        blank=False,
        null=True
    )

    def __str__(self):
        return f'User {self.id}: {self.username}'
