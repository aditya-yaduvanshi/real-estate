# Generated by Django 3.2.3 on 2021-07-23 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='picture',
            field=models.ManyToManyField(blank=True, related_name='photo', to='listings.Picture'),
        ),
    ]
