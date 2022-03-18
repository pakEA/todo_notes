from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from projects.filters import ProjectFilter, ToDoFilter
from projects.models import Project, ToDo
from projects.paginations import ProjectLimitOffsetPagination, ToDoLimitOffsetPagination
from projects.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = ToDoLimitOffsetPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)
