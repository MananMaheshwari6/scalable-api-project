# 🚀 Scalable REST API with Authentication, RBAC & Task Management

This project implements a secure and scalable backend system with:

- JWT Authentication  
- Role-Based Authorization (User & Admin)  
- Task CRUD APIs with Ownership Enforcement  
- API Versioning, Validation & Error Handling  
- Supporting Frontend UI for interaction  

Developed as part of a **Backend Developer Intern Assignment**.

---

## ✅ Features

### 🔐 Authentication
- User Registration and Login
- Password hashing using bcrypt
- JWT authentication
- Protected routes

### 🛡️ Authorization (RBAC)
- Roles: `user`, `admin`
- Admin-only protected routes
- Users can only access their own tasks
- Admins can access everything

### 🗂️ Task Management
- Create Task
- Get Tasks
- Get Task by ID
- Update Task
- Delete Task (Admin Only)
- Each task is linked to a user

### ⚙️ Core System Features
- MongoDB database
- API Versioning (`/api/v1`)
- Centralized Error Handling
- Data Validation
- Clean and scalable folder structure

---

## 🏗️ Tech Stack

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT  
- Bcrypt  
- CORS  

### Frontend (Support UI)
- React + Vite  
- Protected Routes  
- UI for Authentication & Tasks  

---

## 📂 Project Structure

```bash
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
```
## ⚙️ Setup & Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/MananMaheshwari6/scalable-api-project
cd backend
npm install
```

### 2️⃣ Configure Environment

Create .env in backend root:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/scalable-api
JWT_SECRET=supersecretkey
JWT_EXPIRE=30d
NODE_ENV=development
```
#### 3️⃣ Start Server
```
node server.js
```
#### Health Check:

    GET /api/v1/health

### 🔑 Authentication API
#### 🔹 Register
```
POST /api/v1/auth/register
```
```
Request Body
{
  "name": "John",
  "email": "john@mail.com",
  "password": "123456",
  "role": "user"
}
```
#### 🔹 Login
```
POST /api/v1/auth/login
```

Returns JWT token.

#### 🔹 Get Current User
    GET /api/v1/auth/me

-    Header Authorization: Bearer <token>

### 📝 Tasks API
#### 🔹 Get Tasks

- User gets own tasks / Admin gets all tasks
```
GET /api/v1/tasks
```
#### 🔹 Get Single Task
    GET /api/v1/tasks/:id

#### 🔹 Create Task
    POST /api/v1/tasks

```
Body
{
  "title": "My Task",
  "description": "Task Details"
}
```
#### 🔹 Update Task
    PUT /api/v1/tasks/:id

#### 🔹 Delete Task (Admin Only)
    DELETE /api/v1/tasks/:id

### 🛡️ Role Permissions
| Feature          | User | Admin |
| ---------------- | ---- | ----- |
| Register/Login   | ✔️   | ✔️    |
| View Own Tasks   | ✔️   | ✔️    |
| Create Tasks     | ✔️   | ✔️    |
| Update Own Tasks | ✔️   | ✔️    |
| Delete Tasks     | ❌    | ✔️    |
| View All Users   | ❌    | ✔️    |

### 📄 API Documentation

A Postman collection is included for easy testing.

- postman_collection.json

### 🐳 Docker Ready

Includes:
- Dockerfile  
- docker-compose.yml  
- .dockerignore  

Prepared for containerized deployment.

---

### 📈 Scalability & Security

#### 🧩 Scalability
- Horizontal scaling (multiple Node instances)
- Load balancing (NGINX)
- Docker containerization
- Cloud hosting ready (AWS / Render / Railway)
- MongoDB Atlas support
- Redis caching (future enhancement)
- Modular structure → microservice-ready

---

### 🔐 Security
- Bcrypt password hashing
- JWT authentication with expiry
- Protected routes middleware
- Role-Based Access Control (RBAC)
- Centralized error handler
- Secure environment variables

---

### 🎯 Frontend Support UI

Frontend provides:
- Register
- Login
- Dashboard
- Tasks CRUD
- Protected UI flows

---

## ✅ Assignment Checklist

| Requirement | Status |
|------------|--------|
Backend Hosted on GitHub | ✔️
REST API with Auth | ✔️
RBAC Implemented | ✔️
CRUD Entity | ✔️
API Versioning | ✔️
Validation & Error Handling | ✔️
Postman Docs | ✔️
Frontend UI | ✔️
Docker Support | ✔️
Scalability Note | ✔️


