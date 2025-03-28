# 🧑‍💻🚀 User Management System (React + Node + Axios + Express + MUI)
This is a Full-Stack CRUD Application built using React (Frontend) and Express + Axios (Backend).
The app allows you to Fetch, Edit & Delete Users and provides real-time feedback with Toasts and proper Error Handling.

This is a Full Stack **User Management Application** built using **React (Frontend)** and **Express.js (Backend)**.  
It allows you to **fetch, edit, and delete users** using the dummy ReqRes API.  
We also added **Toast notifications**, **Search functionality**, **Error handling UI**, and a shortcut command to run both servers at once.

---

## 🚀 Features

✅ Fetch and display users  
✅ Edit user details (First Name, Last Name, Email)  
✅ Delete a user  
✅ Search bar to filter users  
✅ Toast notifications for actions  
✅ Error handling with friendly UI messages  
✅ Run both frontend & backend with a single command

---

## 📂 Project Structure
project-root/
├── backend/            → Express server (API)
├── frontend/           → React app
├── package.json        → Combined script to run both frontend & backend
├── README.md           → Project documentation

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

git clone https://github.com/HussainGhantiwala/Internship.git cd project-root


### 2. Install Dependencies
Run this in the root directory:
```npm install```
### Start both Front-end and Backend 
```npm run both```
```Frontend: http://localhost:3000```

```Backend API: http://localhost:7000/api```
### Tech Stack ###
What We Implemented
Backend (Express.js):

API routes to fetch, update, delete users (Proxy ReqRes API)

Middleware configuration (CORS, JSON parsing)

Frontend (React + MUI):

User list with Edit and Delete actions

Edit User Dialog

Search bar to filter users by name or email

Toast Notifications for success & error

Error handling UI for API failures

Clean, organized, and optimized code

Other Improvements:

Code cleanup in all files

Error handling improved with UI feedback

Installed and configured Concurrently for easy development

📌 APIs Used
We used dummy APIs from: https://reqres.in/