from django.urls import path, include
from rest_framework.routers import DefaultRouter
from hrm.views import EmployeeViewSet, DepartmentViewSet
from hrm.views import get_all_emails
from hrm.views import get_directory_tree
from hrm.views import get_api_logs
from hrm.views import protected_view

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'departments', DepartmentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
path('api/protected/', protected_view),
path('log/', get_api_logs, name='get_api_logs'),
path('api/emails/', get_all_emails),
    path('api/directory_tree/', get_directory_tree, name='get_directory_tree'),
]
