from rest_framework.mixins import UpdateModelMixin
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Users
from .serializers import UserModelSerializer


class UserModelViewSet(UpdateModelMixin, ReadOnlyModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer
