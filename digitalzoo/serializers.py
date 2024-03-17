from rest_framework import serializers
from digitalzoo.models import Animal, Habitat,Zookeeper,Carelog,Member,Activity
from django.contrib.auth import get_user_model
class AnimalSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(read_only=True)
     class Meta:
          model = Animal
          fields = '__all__'

class HabitatSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(read_only=True)
     class Meta:
          model = Habitat
          fields = '__all__'

class ZookeeperSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(read_only=True)
     class Meta:
          model = Zookeeper
          fields = '__all__'

class CarelogSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(read_only=True)
     class Meta:
          model = Carelog
          fields = '__all__'

class MemeberSerializer(serializers.ModelSerializer):
     id = serializers.IntegerField(read_only=True)
     class Meta:
          model = Member
          fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
      id = serializers.IntegerField(read_only=True)
      class Meta:
           model = Activity
           fields = '__all__'




          




