from django.core.management.base import BaseCommand
from django.db import transaction

from users.models import Users
from users.factories import UsersFactory

NUM_USERS = 10


class Command(BaseCommand):

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting old data...')
        models = [Users]
        for m in models:
            m.objects.all().delete()

        self.stdout.write('Creating new data...')
        people = []
        for _ in range(NUM_USERS):
            person = UsersFactory()
            people.append(person)
