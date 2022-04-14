import json
from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer

from users.models import Users
from .models import ToDo


class TestProjectModelViewSet(APITestCase):
    def test_get_list_guests(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestToDoModelViewSet(APITestCase):
    def test_edit_admin(self):
        todo_notes = mixer.blend(ToDo)
        admin = Users.objects.create_superuser('admin', 'admin@gmail.com', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.put(f'/api/todo_notes/{todo_notes.id}/',
                                   {'project': todo_notes.project.id,
                                    'text': 'start project',
                                    'created_at': '01.01.2022',
                                    'updated_at': '14.04.2022',
                                    'author': todo_notes.author.uid,
                                    'is_active': True})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_notes = ToDo.objects.get(id=todo_notes.id)
        self.assertEqual(todo_notes.text, 'start project')
