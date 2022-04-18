from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from projects.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import UserModelViewSet


router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo_notes', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/users/', UserModelViewSet.as_view()),
    path('api-token-auth/', views.obtain_auth_token),
]
