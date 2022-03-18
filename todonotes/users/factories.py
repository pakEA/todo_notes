import factory
from factory.django import DjangoModelFactory

from .models import Users


class UsersFactory(DjangoModelFactory):
    class Meta:
        model = Users

    username = factory.Faker('user_name')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
