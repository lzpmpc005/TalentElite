import requests
import random
import string

API_ENDPOINT = "http://127.0.0.1:8000/api/members/"

def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))

def generate_random_email():
    domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"]
    username = generate_random_string(8)
    domain = random.choice(domains)
    return f"{username}@{domain}"

def generate_random_member():
    username = generate_random_string(8)
    password = generate_random_string(10)
    full_name = generate_random_string(10)
    email = generate_random_email()
    ticket_period = random.choice(["day", "week", "month", "year"])
    ticket_type = random.choice(["adult", "child"])
    points = random.randint(0, 100)
    return {
        "username": username,
        "password": password,
        "full_name": full_name,
        "email": email,
        "ticket_period": ticket_period,
        "ticket_type": ticket_type,
        "points": points
    }

def post_members(num_members):
    for _ in range(num_members):
        member_data = generate_random_member()
        response = requests.post(API_ENDPOINT, json=member_data)
        if response.status_code == 201:
            print(f"Member {member_data['username']} created successfully.")
        else:
            print(f"Failed to create member {member_data['username']}. Status code: {response.status_code}")

if __name__ == "__main__":
    num_members = 100  # 设置要生成的成员数量
    post_members(num_members)
