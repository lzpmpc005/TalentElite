# middleware.py
import json
import requests
from django.utils.deprecation import MiddlewareMixin

class ApiRequestLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/api/'):  # 只处理 API 请求
            data = {
                'method': request.method,
                'path': request.path,
                'headers': dict(request.headers),
                'body': request.body.decode('utf-8') if request.body else ''
            }
            try:
                requests.post('http://localhost:8080/log', json=data)
            except requests.RequestException as e:
                # 处理请求异常
                print(f"Error logging request: {e}")
        return None
