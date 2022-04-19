from rest_framework.serializers import ModelSerializer
from .models import Users


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ('uid', 'first_name', 'last_name', 'position',
                  'email', 'username')


class UserModelSerializerWithStaff(ModelSerializer):
    class Meta:
        model = Users
        fields = ('uid', 'first_name', 'last_name', 'position',
                  'email', 'username', 'is_superuser', 'is_staff')
