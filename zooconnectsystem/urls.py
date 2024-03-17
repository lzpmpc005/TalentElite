from django.urls import path, include
from rest_framework import routers
from digitalzoo.views import (AnimalViewSet, HabitatViewSet, ZookeeperViewSet,
                              CarelogViewSet, MemberViewSet,
                              ActivityViewSet)
from django.views.generic import TemplateView
from django.contrib import admin

# 注册视图集
# 创建路由器并注册视图集
router = routers.DefaultRouter()
router.register(r'animals', AnimalViewSet)
router.register(r'habitats', HabitatViewSet)
router.register(r'zookeepers', ZookeeperViewSet)
router.register(r'carelogs', CarelogViewSet)
router.register(r'members', MemberViewSet)
router.register(r'activities', ActivityViewSet)




# API的URL模式
api_urlpatterns = [
    path('', include(router.urls)),
]

# 其他URL模式（如admin等）
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('', TemplateView.as_view(template_name='index.html'))

]
