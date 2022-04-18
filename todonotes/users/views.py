from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Users
from .serializers import UserModelSerializer, UserModelSerializerWithStaff


class UserModelViewSet(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerWithStaff
        return UserModelSerializer
