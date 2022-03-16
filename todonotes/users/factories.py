import factory
from factory.django import DjangoModelFactory

from .models import Users


class UsersFactory(DjangoModelFactory):
    class Meta:
        model = Users

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    position = factory.Faker('position')
    email = factory.Faker('email')
    username = factory.Faker('username')
