from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


class Users(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    position = models.CharField(max_length=64)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
