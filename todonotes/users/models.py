from uuid import uuid4

from django.db import models


class Users(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(unique=True, max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField(max_length=4)
    email = models.EmailField(unique=True)
