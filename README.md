# Full-Stack User Management App

A full-stack web application built with **React.js**, **Node.js (Express)**, and **MongoDB** that allows users to **register, login (with email/password or Google OAuth)**, and manage user records via a dashboard with features like **sorting, pagination, edit, delete, and bulk delete**.

---

## 🚀 Features

### Authentication

- User **Registration** with validation (name, email, password, etc.)
- User **Login** with JWT authentication
- **Google OAuth Sign-In** integration
- Passwords hashed with **bcrypt**
- Auth-protected backend routes

### Dashboard

- Accessible only after login
- Displays **data table** with following columns:
  - Name
  - Email
  - Phone Number
  - Age
  - Father’s Number
  - Action (Edit / Delete)
- **CRUD Features**:
  - Edit: Update row data in MongoDB
  - Delete: Remove a single row
  - Multi-select Delete: Remove multiple rows at once
- **Table Functionalities**:
  - Sorting (ascending / descending on all columns)
  - Pagination (customizable limit per page)

### Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js, JWT, bcrypt
- **Database**: MongoDB (Atlas)
- **Auth**: JWT + Google OAuth (Google Identity / Passport)

---

## 🛠️ Project Structure

```
project-root/
│
├── backend/
│ ├── src/
│ │ ├── index.js # Express app entry
│ │ ├── config/db.js # Mongo connection
│ │ ├── models/User.js # Mongoose schema
│ │ ├── routes/ # Auth + Users routes
│ │ ├── controllers/ # Business logic
│ │ └── middlewares/auth.js# JWT middleware
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.jsx
│ │ ├── pages/ # Login, Register, Dashboard
│ │ ├── components/ # UserTable, EditModal, Pagination
│ │ └── services/api.js # Axios instance
│ └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/fullstack-assignment.git
cd fullstack-assignment
```

### 2. Backend Setup

cd backend
npm install

#### Create a .env file in /backend:

PORT=8000
MONGODB_URI=mongo-uri
NODE_ENV=development
CORS_ORIGIN=\*
ACCESS_TOKEN_SECRET=access-token-secret
ACCESS_TOKEN_EXPIRY=days
REFRESH_TOKEN_SECRET=refresh-token-secret
REFRESH_TOKEN_EXPIRY=days
GOOGLE_CLIENT_ID=client-id
GOOGLE_CLIENT_SECRET=client-secret

### Run backend:

npm run dev

### 3. Frontend Setup:

cd ../frontend
npm install
npm start

# 🔑 API Endpoints

```Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login with email/password

POST /api/auth/google → Login with Google (id_token verification)

Users

GET /api/users?page=&limit=&sortBy=&order= → List users with pagination/sorting

PUT /api/users/:id → Update user

DELETE /api/users/:id → Delete user

POST /api/users/bulk-delete → Bulk delete users
```

# 👨‍💻 Hritik Chauhan

Developed as part of an assignment project.
Tech stack: React.js + Node.js + MongoDB

---

Do you want me to **include actual screenshots & sample `.env` values** in the `README.md` (so it looks submission-ready), or should I leave it clean for you to add later?
