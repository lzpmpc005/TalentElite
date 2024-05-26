from django.db import models


class Department(models.Model):
    name = models.CharField(max_length=100)
    descripation = models.CharField(max_length=1000)

class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    photo = models.URLField(max_length=200, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

