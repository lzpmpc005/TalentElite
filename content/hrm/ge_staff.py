import requests
import random
import json


def generate_random_employee(id):
    first_names = ["John", "Jane", "Alice", "Bob", "Charlie", "Daisy", "Ella", "Frank", "Grace", "Harry"]
    last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"]

    employee = {
        "id": id,
        "first_name": random.choice(first_names),
        "last_name": random.choice(last_names),
        "position": "staff",
        "age": random.randint(18, 65),
        "email": "vincent.yelpen@outlook.com",
        "phone_number": "015535507507",
        "address": "Random Address " + str(random.randint(1, 100)),
        "photo": "",
        "department": random.randint(1, 10)
    }

    return employee


def post_employee_data(employee):
    url = "http://localhost:8000/api/employees/"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(employee), headers=headers)
    if response.status_code == 201:
        print(f"Employee {employee['id']} created successfully.")
    else:
        print(
            f"Failed to create employee {employee['id']}. Status code: {response.status_code}, Response: {response.text}")


if __name__ == "__main__":
    number_of_employees = 10  # 你可以调整生成员工的数量
    for i in range(1, number_of_employees + 1):
        employee = generate_random_employee(i)
        post_employee_data(employee)
