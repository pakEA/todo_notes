from rest_framework.mixins import UpdateModelMixin, CreateModelMixin
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Users
from .serializers import UserModelSerializer


class UserModelViewSet(CreateModelMixin, UpdateModelMixin, ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer
