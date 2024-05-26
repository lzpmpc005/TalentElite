
<h1>
  <br /><br /><strong>ZooConnect</strong>
</h1>
<h5>Digital Zoo Management System</h5>

[![Latest release](https://img.shields.io/github/v/release/aregtech/areg-sdk?label=Latest%20release&style=social)](https://github.com/aregtech/areg-sdk/releases/tag/v1.5.0)
[![GitHub commits](https://img.shields.io/github/commits-since/aregtech/areg-sdk/v1.5.0.svg?style=social)](https://GitHub.com/aregtech/areg-sdk/commit/)
[![Stars](https://img.shields.io/github/stars/aregtech/areg-sdk?style=social)](https://github.com/aregtech/areg-sdk/stargazers)
[![Fork](https://img.shields.io/github/forks/aregtech/areg-sdk?style=social)](https://github.com/aregtech/areg-sdk/network/members)
[![Watchers](https://img.shields.io/github/watchers/aregtech/areg-sdk?style=social)](https://github.com/aregtech/areg-sdk/watchers)
[![Wiki Pages](https://img.shields.io/badge/AREG%20Wiki%20Pages-8-brightgreen?style=social&logo=wikipedia)](https://github.com/aregtech/areg-sdk/wiki/)

---
## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)
- [Table of contents](#table-of-contents)
- [Project Status](#project-status)
- [Introduction](#introduction)
- [Backend Installation and Run](#backend-installation-and-run)
- [Frontend Installation and Run](#frontend-installation-and-run)
- [API Endpoints](#api-endpoints)

---

<!-- markdownlint-disable -->
## Project Status[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#project-status)
<table class="no-border">
 <tr>Django+Restful Framework+React+Semi Design</tr>
  <tr>
    <td><img src="https://img.shields.io/badge/OS-linux%20%7C%20windows-blue??style=flat&logo=Linux&logoColor=b0c0c0&labelColor=363D44" alt="Operating systems"/></td>
    <td colspan="2"><img src="https://img.shields.io/badge/CPU-x86%20%7C%20x86__64%20%7C%20arm%20%7C%20aarch64-blue?style=flat&logo=amd&logoColor=b0c0c0&labelColor=363D44" alt="CPU Architect"/></td>
  </tr>
</table>

---

## Introduction[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

**ZooConnect** 
This project is part of a Django-based digital zoo management system. It provides the following features:
- Animals Management
- Habitats Management
- Users Management
- Activities Management
- Staff Management

## Backend Installation and Run

1. Clone the project to your local machine:

```bash
git clone https://github.com/lzpmpc005/ZooConnect.git
cd ZooConnect
```

2. Create a Django environment and install backend dependencies:
```bash
pip install django
pip install django_rest_framework
pip install -r requirements.txt
```
3. Perform database migration:
```
python manage.py makemigrations
python manage.py migrate
```
4. Run the development server:
```
python manage.py runserver
```
5. Visit http://localhost:8000/ to view the project.

> 💡 Attention:All images from Internet, do not use theose images examples for business usage [[Unsplash]](https://unsplash.com/). 

---
## Frontend Installation and Run

1. Clone the project to your local machine:

```bash
git clone https://github.com/lzpmpc005/ZooConnect.git
cd frontend
```

2. Download Node.js and NPM  environment and test :
```bash
npm -v
node -v
```
3. React Installaion and RUN:
```bash
cnpm install -g create-react-app
cd frontend/
```

4. Semi UI Installation and RUN:
```bash
npm install @douyinfe/semi-ui
npm install @douyinfe/semi-icons-lab
npm install react-router-dom
```
5. Visit http://localhost:3000/ to view the frontend.

> 💡 Attention:All images from Internet, do not use theose image examples for business usage [[Images via Unsplash]](https://unsplash.com/). 

---



## API Endpoints[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#motivation)



"animals": "http://127.0.0.1:8000/api/animals/",
"habitats": "http://127.0.0.1:8000/api/habitats/",
    "zookeepers": "http://127.0.0.1:8000/api/zookeepers/",
    "carelogs": "http://127.0.0.1:8000/api/carelogs/",
    "members": "http://127.0.0.1:8000/api/members/",
    "activities": "http://127.0.0.1:8000/api/activities/",
    "tour_schedules": "http://127.0.0.1:8000/api/tour_schedules/"


---