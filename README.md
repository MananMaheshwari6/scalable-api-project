🚀 Scalable REST API with Authentication, RBAC & Task Management

This project implements a secure, scalable backend system with:

User Authentication (JWT)

Role-Based Authorization (User & Admin)

Task CRUD APIs with Ownership Enforcement

API Versioning, Validation & Error Handling

Supporting frontend UI for interaction

Designed as part of a Backend Developer Intern Assignment.

✅ Features
🔐 Authentication

Register & Login

Password hashing using bcrypt

JWT Authentication

Protected routes

🛡️ Authorization (RBAC)

Roles: user, admin

Admin-only protected routes

Users can only access their own tasks

Admins can access everything

🗂️ Task Management

Create Task

Get Tasks

Get Task by ID

Update Task

Delete Task (Admin Only)

Each task is linked to a user

⚙️ Core System Features

MongoDB database

API Versioning (/api/v1)

Centralized Error Handling

Data Validation

Clean folder structure

Scalable & production-ready architecture

🏗️ Tech Stack

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT

Bcrypt

CORS

Frontend (Support UI)

React + Vite

Protected Routes

UI for Authentication & Tasks

📂 Project Structure
backend/
 ├─ src/
 │   ├─ controllers/
 │   ├─ middleware/
 │   ├─ models/
 │   ├─ routes/
 │   ├─ config/
 │   └─ app.js
 ├─ server.js
 ├─ README.md
 ├─ .env (ignored)
 └─ Docker files

⚙️ Setup & Run Locally
1️⃣ Clone Repository
git clone <repo-url>
cd backend
npm install

2️⃣ Configure Environment

Create .env in root of backend:

PORT=5000
MONGO_URI=mongodb://localhost:27017/scalable-api
JWT_SECRET=supersecretkey
JWT_EXPIRE=30d
NODE_ENV=development


If deploying, replace Mongo URI with MongoDB Atlas.

3️⃣ Start Server
npm start


Default server runs on:

http://localhost:5000


Health Check:

GET /api/v1/health

🔑 Authentication API
Register
POST /api/v1/auth/register


Body:

{
  "name": "John",
  "email": "john@mail.com",
  "password": "123456",
  "role": "user"
}

Login
POST /api/v1/auth/login


Returns JWT Token

Get Current User

Protected

GET /api/v1/auth/me


Header:

Authorization: Bearer <token>

📝 Tasks API
Get Tasks (User gets own tasks / Admin gets all)
GET /api/v1/tasks

Get Single Task
GET /api/v1/tasks/:id

Create Task
POST /api/v1/tasks


Body:

{
  "title": "My Task",
  "description": "Task Details"
}

Update Task
PUT /api/v1/tasks/:id

Delete Task

(Admin Only)

DELETE /api/v1/tasks/:id

| Feature         | User | Admin |
| --------------- | ---- | ----- |
| Register/Login  | ✔️   | ✔️    |
| View Own Tasks  | ✔️   | ✔️    |
| Create Task     | ✔️   | ✔️    |
| Update Own Task | ✔️   | ✔️    |
| Delete Task     | ❌    | ✔️    |
| View All Users  | ❌    | ✔️    |


Ownership rules:

Users can only access their own tasks

Admin can access all tasks

📄 API Documentation

A full Postman Collection is included for easy testing.

File:

postman_collection.json


Import → Test → Done ✅

🐳 Docker Ready

Docker configuration files are included to support containerized deployment.

Includes:

Dockerfile

.dockerignore

docker-compose.yml

Prepares backend for deployment in container environments.

📈 Scalability & Security Notes
🧩 Scalability

The architecture supports scaling using:

Horizontal Scaling (Multiple Node Instances)

Load Balancing (NGINX)

Docker Containerization

Cloud Hosting (AWS / Render / Railway)

MongoDB Atlas (Cloud Database)

Redis Caching (Optional Future Improvement)

Modular Code Ready for Microservices

🔐 Security

Passwords hashed (bcrypt)

JWT-based authentication with expiry

Protected API endpoints

Role-based authorization

Centralized error handler

Environment-based secrets

🎯 Frontend Support UI

A frontend is provided to:

Register Users

Login

Display Dashboard

Manage Tasks (CRUD)

Handle protected UI flows

✅ Assignment Checklist
Requirement	Status
Backend Hosted on GitHub	✔️
REST API with Auth	✔️
Role-Based Access	✔️
CRUD Entity Implemented	✔️
API Versioning	✔️
Validation & Error Handling	✔️
Postman Docs	✔️
Frontend UI	✔️
Docker Support	✔️
Scalability Note	✔️
