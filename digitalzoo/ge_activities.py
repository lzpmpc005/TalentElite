import requests
from datetime import datetime, timedelta
import random

# 生成活动名称的示例列表
activity_names = ["Animal Feeding", "Guided Zoo Tour", "Animal Show", "Keeper Talk", "Wildlife Photography Workshop", "Zoo Conservation Lecture"]

# 生成活动描述的示例列表
activity_descriptions = [
    "Join us for a fascinating tour behind the scenes as our keepers feed the animals.",
    "Explore the zoo with our knowledgeable guides and learn about our conservation efforts.",
    "Don't miss our exciting animal show featuring our star performers!",
    "Meet our dedicated keepers and learn about the care and conservation of our animals.",
    "Capture stunning wildlife images with tips and tricks from our expert photographers.",
    "Discover the importance of conservation efforts and how you can make a difference."
]

# 生成活动开始时间的范围（假设从当前时间开始，至今日后30天）
start_time_range_start = datetime.now()
start_time_range_end = start_time_range_start + timedelta(days=30)

# 生成活动结束时间的范围（假设活动持续1-3小时）
end_time_range_start = timedelta(hours=1)
end_time_range_end = timedelta(hours=3)

# 生成指定数量的活动
def generate_activities(num_activities):
    activities = []
    for _ in range(num_activities):
        name = random.choice(activity_names)
        description = random.choice(activity_descriptions)
        start_time = start_time_range_start + (start_time_range_end - start_time_range_start) * random.random()
        end_time = start_time + end_time_range_start + (end_time_range_end - end_time_range_start) * random.random()
        activities.append({
            'name': name,
            'description': description,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat()
        })
    return activities

# 将活动POST到API端点
def post_activities(activities):
    url = 'http://127.0.0.1:8000/api/activities/'
    for activity in activities:
        response = requests.post(url, json=activity)
        if response.status_code == 201:
            print(f"Activity '{activity['name']}' created successfully.")
        else:
            print(f"Failed to create activity '{activity['name']}'.")

if __name__ == "__main__":
    num_activities = int(input("Enter the number of activities to generate: "))
    activities = generate_activities(num_activities)
    post_activities(activities)
