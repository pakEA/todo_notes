from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField

from projects.models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    author = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
