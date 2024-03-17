from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from digitalzoo.models import (Animal, Habitat, Zookeeper,
                               Carelog, Member,
                               Activity,Tourschedule)
from digitalzoo.serializers import (AnimalSerializer, HabitatSerializer,
                                    ZookeeperSerializer, CarelogSerializer,MemeberSerializer,
                                    ActivitySerializer,TourscheduleSerializer)
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

class TourscheduleViewSet(viewsets.ModelViewSet):
     queryset = Tourschedule.objects.all()
     serializer_class = TourscheduleSerializer

@api_view(['GET'])
def tourschedule_habitat_status(request):
    # 获取所有的TourSchedule
    tourschedules = Tourschedule.objects.all()

    # 初始化结果列表
    results = []

    # 对每个TourSchedule执行操作
    for tourschedule in tourschedules:
        # 获取当前TourSchedule的ID
        tourschedule_id = tourschedule.id

        # 获取当前TourSchedule的所有关联栖息地
        habitats = tourschedule.habitat.all()

        # 初始化当前TourSchedule的栖息地状态列表
        tourschedule_habitat_statuses = []

        # 检查每个关联栖息地的状态
        for habitat in habitats:
            # 获取栖息地状态
            habitat_status = tourschedule.check_habitat_status()

            # 将栖息地状态添加到当前TourSchedule的栖息地状态列表中
            tourschedule_habitat_statuses.append({
                "habitat_id": habitat.id,
                "status": habitat_status['status'],
                "end_time_remaining": habitat_status['end_time_remaining']
            })

        # 将当前TourSchedule的栖息地状态列表添加到结果列表中
        results.append({
            "tourschedule_id": tourschedule_id,
            "habitat_status": tourschedule_habitat_statuses
        })

    return Response(results)




