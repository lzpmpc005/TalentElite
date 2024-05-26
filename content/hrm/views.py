from rest_framework import viewsets
from .models import Employee, Department
from .serializers import EmployeeSerializer, DepartmentSerializer
import logging
from django.http import JsonResponse
import os
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

def get_all_emails(request):
    emails = list(Employee.objects.values_list('email', flat=True))
    return JsonResponse(emails, safe=False)


def get_directory_tree(request):
    directory_path = "/Users/v/talentelite/backup/database_backup/"

    directory_tree = []

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.relpath(os.path.join(root, file), directory_path)
            directory_tree.append(file_path)

    return JsonResponse({'directory_tree': directory_tree})

def get_api_logs(request):
    logs = []
    try:
        with open("api_log.json", "r") as log_file:
            for line in log_file:
                logs.append(json.loads(line))
    except FileNotFoundError:
        return JsonResponse({"error": "Log file not found"}, status=404)
    return JsonResponse(logs, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "This is a protected view"})