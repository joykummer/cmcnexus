from django.core.management.base import BaseCommand

from apps.categories.models import Category


class Command(BaseCommand):
    help = 'Creates permission groups for and gives them the default permissions. ' \
           'If a group already exists, nothing is done.'

    def handle(self, *args, **options):

        for choice in Category.CATEGORY_CHOICES:
            category, created = Category.objects.get_or_create(pk=choice[0])
            if created:
                print(f'Created {choice[1]}')
            else:
                print(f'{choice[1]} exists')
