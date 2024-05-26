from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, DepartmentViewSet, get_all_emails, get_directory_tree, get_api_logs, protected_view

# 创建一个默认的路由器并注册视图集
router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'departments', DepartmentViewSet)

# 定义 URL 模式
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/protected/', protected_view),
    path('log/', get_api_logs, name='get_api_logs'),
    path('api/emails/', get_all_emails),
    path('api/directory_tree/', get_directory_tree, name='get_directory_tree'),
]
