# Generated by Django 4.2.7 on 2024-03-17 16:54

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("digitalzoo", "0015_rename_habitats_tourschedule_habitat_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tourschedule",
            name="animal",
        ),
    ]