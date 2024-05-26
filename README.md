# Enterprise Employee Management System
Video introduction link:https://livelancsac-my.sharepoint.com/:v:/g/personal/chengy28_lancaster_ac_uk/EZsRxhNyWMhLtVJhubMi3AEByyvbBYFkcZnxhQpIu1Q5aQ
## Introduction

This project is an enterprise employee management system that includes features such as login authentication, employee information management, log recording, email broadcasting, and database backup. It leverages multiple backend and frontend technologies to provide a comprehensive and user-friendly enterprise management solution.

## Table of Contents

- [Enterprise Employee Management System](#enterprise-employee-management-system)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
    - [Backend](#backend)
      - [Go Auth Service](#go-auth-service)
    - [Django Backend](#django-backend)
    - [C++ Backup Service](#c-backup-service)
    - [Express Email Service](#express-email-service)
    - [Frontend](#frontend)
  - [Getting Started](#getting-started)
    - [Running the Backend Services](#running-the-backend-services)
      - [Go Auth Service](#go-auth-service-1)
      - [Django Backend](#django-backend-1)
      - [Cpp backend](#cpp-backend)
      - [Express Email Service](#express-email-service-1)
      - [Running the Frontend](#running-the-frontend)
    - [Directory Structure](#directory-structure)
    - [Notes](#notes)

## Technologies Used

- **Backend Technologies**:
  - Go: User authentication and logging API
  - Django: Employee and department management API
  - C++ (Crow): Database backup service
  - Express.js: Email broadcasting service

- **Frontend Technologies**:
  - React: Building the user interface
  - Axios: HTTP client for making API requests
  - Semi Design: UI components library

## Environment Setup

1. **Install Go**: Follow the instructions [here](https://golang.org/doc/install).
2. **Install Python**: Follow the instructions [here](https://www.python.org/downloads/).
3. **Install Node.js and npm**: Follow the instructions [here](https://nodejs.org/en/download/).
4. **Install C++ Compiler**: Ensure you have a C++ compiler installed. For MacOS, you can use `clang`, and for Windows, you can use `MinGW`.
5. **Install Docker**: Follow the instructions [here](https://www.docker.com/products/docker-desktop).

## Installation

whole project

```bash
git clone https://github.com/lzpmpc005/TalentElite
cd TalentElite
```

### Backend

#### Go Auth Service

```bash
cd backend/go-auth
go mod tidy
go build
```
### Django Backend

```bash
cd backend/django
python3 -m venv env
source env/bin/activate  
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

### C++ Backup Service
setting Crow library first https://github.com/CrowCpp/Crow

```bash
cd CROW
mkdir build
cd build
cmake ..
make install
```

```bash
cd backend/cpp-backup
mkdir build
cd build
cmake ..
make
./cpp-backup
```

### Express Email Service

```bash
cd backend/express-email
npm install

```

### Frontend

```bash
cd frontend
npm install
```
## Getting Started
### Running the Backend Services
#### Go Auth Service

```bash
cd backend/go-auth
go run main.go
```
#### Django Backend
```bash
cd backend/django
source env/bin/activate 
python manage.py runserver

```
#### Cpp backend
```bash
cd backend/cpp-backup/build
./cpp-backup

```
#### Express Email Service
```bash
cd backend/express-email
node server.js

```
#### Running the Frontend
```bash

cd frontend
npm start
```

### Directory Structure
- backend/
  - go-auth/    // Go authentication and logging service
    - main.go
  - django/     // Django backend service
    - manage.py
    - hrm/
      - models.py
      - views.py
      - urls.py
    - settings.py
  - cpp-backup/   // C++ backup service
    - main.cpp
    - CMakeLists.txt
  - express-email/ // Express.js email broadcasting service
    - server.js
    - package.json
- frontend/
  - src/
    - components/
      - LoginComponent.js
      - EmployeeListComponent.js
      - LogComponent.js
      - EmailComponent.js
    - App.js
    - index.js

### Notes
Ensure that all backend services are running before starting the frontend application.
The Go Auth Service handles user authentication and token generation.
The Django Backend manages employee and department data.
The C++ Backup Service periodically backs up the database.
The Express Email Service handles email broadcasting to all employees.
The frontend interacts with these services to provide a seamless user experience.
This project leverages the combined power of multiple backend and frontend technologies to deliver a robust and comprehensive enterprise management solution.
