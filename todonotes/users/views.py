from rest_framework.viewsets import ModelViewSet

from .models import Users
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer
