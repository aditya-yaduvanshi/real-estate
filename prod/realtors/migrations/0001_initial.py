# Generated by Django 3.2.3 on 2021-07-01 09:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Realtor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('photo', models.ImageField(upload_to='photos/%Y/%M/%d/')),
                ('description', models.TextField(blank=True)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.CharField(max_length=64)),
                ('top_seller', models.BooleanField(default=False)),
                ('date_hired', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
