import graphene
from graphene_django import DjangoObjectType

from users.models import Users
from projects.models import Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, text, id):
        todo = ToDo.objects.get(pk=id)
        todo.text = text
        todo.save()
        return ToDoMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


class Query(graphene.ObjectType):
    all_todo_notes = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    project_by_user = graphene.List(ProjectType, user=graphene.String(required=False))

    def resolve_all_todo_notes(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_project_by_user(root, info, user=None):
        projects = Project.objects.all()
        if user:
            projects = projects.filter(users__first_name=user)
        return projects


schema = graphene.Schema(query=Query, mutation=Mutation)
