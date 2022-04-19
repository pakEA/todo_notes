from django.contrib import admin
from django.urls import path, include, re_path
from graphene_django.views import GraphQLView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from projects.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import UserModelViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='1',
        description='Documentation',
        contact=openapi.Contact(email='pak_ea@inbox.ru'),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

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
    # openapi
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema_json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema_swagger_ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema_redoc'),
    # GraphQL
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
