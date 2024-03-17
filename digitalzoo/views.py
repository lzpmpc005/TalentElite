from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from digitalzoo.models import (Animal, Habitat, Zookeeper,
                               Carelog, Member,
                               Activity,)
from digitalzoo.serializers import (AnimalSerializer, HabitatSerializer,
                                    ZookeeperSerializer, CarelogSerializer,MemeberSerializer,
                                    ActivitySerializer)
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer

class ZookeeperViewSet(viewsets.ModelViewSet):
    queryset = Zookeeper.objects.all()
    serializer_class = ZookeeperSerializer

class CarelogViewSet(viewsets.ModelViewSet):
    queryset = Carelog.objects.all()
    serializer_class = CarelogSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemeberSerializer
class ActivityViewSet(viewsets.ModelViewSet):
     queryset = Activity.objects.all()
     serializer_class = ActivitySerializer




