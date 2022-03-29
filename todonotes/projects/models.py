from django.contrib.auth import get_user_model
from django.db import models

from users.models import Users


class Project(models.Model):
    title = models.CharField(max_length=64, blank=False)
    desc = models.CharField(max_length=128)
    href = models.URLField(blank=True)
    users = models.ManyToManyField(Users)

    def __str__(self):
        return self.title


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=512, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False, db_index=True)
