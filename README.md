# HR Management System

A full-stack internal HR application built with **React**, **TypeScript**, **Node.js**, and **PostgreSQL**.  
It allows **Admins** to manage employees and **Employees** to view their own data.

---

## 🧱 Tech Stack

- **Frontend:** React + TypeScript + Vite + TailwindCSS  
- **Backend:** Node.js + Express + Prisma  
- **Database:** PostgreSQL (hosted on Neon)  
- **Authentication:** JWT + bcrypt  
- **Deployment:** Render (API) + Vercel/Render (Frontend)

---

## 👤 Roles & Features

### Admin
- Login / Logout  
- Add, edit, and delete employees  
- View full employee list  

### Employee
- Login / Logout  
- View their own profile  

### Security
- Role-based access (Admin / Employee)  
- JWT authentication  
- Demo users automatically created on server start *(skipped in production)*  

---

## 👥 Demo Users

| Role | Email | Password |
|------|--------|----------|
| Admin | admin@ziggy.com | admin123 |
| Employee | employee@ziggy.com | employee123 |

---

## 🧠 Project Decisions & Notes

- Registration endpoint **removed by design**: only Admins can create new users.  
- Demo users are created automatically in development.  
- In production, demo user creation is **skipped** (`NODE_ENV=production`).  
- Database access and migrations handled via **Prisma ORM**.  

---

## 🌐 Live Demo
> 🔗 **Frontend:** https://hr-system-fe.onrender.com
> 🔗 **Backend API:** https://hr-system-k06k.onrender.com



---
