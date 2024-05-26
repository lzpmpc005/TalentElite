import time
import json


class APILoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 在请求之前记录开始时间
        start_time = time.time()

        # 获取响应
        response = self.get_response(request)

        # 在响应之后记录结束时间
        end_time = time.time()

        # 记录日志
        log_data = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime()),
            "method": request.method,
            "endpoint": request.get_full_path(),
            "status": response.status_code,
            "duration": end_time - start_time,
        }

        with open("api_log.json", "a") as log_file:
            log_file.write(json.dumps(log_data) + "\n")

        return response
