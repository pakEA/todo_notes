import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, force_authenticate

from .views import UserModelViewSet
from .models import Users


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'first_name': 'Sam',
                                               'last_name': 'Tsui',
                                               'position': 'devops',
                                               'email': 'tsui_s@gmail.com',
                                               'username': 'SamTsui'})
        admin = Users.objects.create_superuser('admin', 'admin@gmail.com', 'admin')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = Users.objects.create(first_name='Sam',
                                    last_name='Tsui',
                                    position='devops',
                                    email='tsui_s@gmail.com',
                                    username='SamTsui')
        client = APIClient()
        response = client.get(f'/api/users/{user.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user = Users.objects.create(first_name='Sam',
                                    last_name='Tsui',
                                    position='devops',
                                    email='tsui_s@gmail.com',
                                    username='SamTsui')
        client = APIClient()
        admin = Users.objects.create_superuser('admin', 'admin@gmail.com', 'admin')
        client.login(username='admin', password='admin')
        response = client.put(f'/api/users/{user.uid}/',
                              {'first_name': 'Tom',
                               'last_name': 'Gaylord',
                               'position': 'accountant',
                               'email': 'gaylord_t@gmail.com',
                               'username': 'GaylordTom'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = Users.objects.get(uid=user.uid)
        self.assertEqual(user.first_name, 'Tom')
        client.logout()
