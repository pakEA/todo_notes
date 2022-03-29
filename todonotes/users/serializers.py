from rest_framework.serializers import ModelSerializer
from .models import Users


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ('url', 'first_name', 'last_name', 'position',
                  'email', 'username')
