# 🎓 NextScholars - Scholarship Management Platform

NextScholars is a role-based full-stack scholarship management system that helps students search, apply, and track scholarships, while providing moderators and admins tools to manage users, applications, and reviews.

🔗 **Live Site**: [NextScholars](https://next-scholars.web.app/)

---

## 🚀 Features

### 🧑‍🎓 User

- Browse and filter scholarships
- Apply for scholarships with Stripe payments
- Fill out personal application form
- View "My Applications" with live status updates
- Add/edit/delete scholarship reviews

### 🛡️ Moderator

- Post and manage scholarships
- View and manage reviews
- View and manage scholarship applications
- Add feedback to applications

### 👨‍💼 Admin

- Manage all scholarships and applications
- Manage all user roles (user, moderator, admin)
- View and delete reviews
- Role-based user filtering and sorting

---

## 🛠️ Tech Stack with Version

### 🖥️ Frontend (React with Vite)

| Library / Tool           | Version  | Purpose                             |
| ------------------------ | -------- | ----------------------------------- |
| **React**                | ^18.2.0  | UI framework                        |
| **Vite**                 | ^5.0.0   | Lightning-fast dev server & bundler |
| **React Router DOM**     | ^6.23.0  | Routing                             |
| **Tailwind CSS**         | ^3.4.1   | Utility-first CSS                   |
| **ShadCN/UI**            | Latest   | Modern pre-built UI components      |
| **React Hook Form**      | ^7.49.2  | Form validation & state management  |
| **Axios**                | ^1.6.2   | HTTP client for API requests        |
| **TanStack React Query** | ^5.28.0  | Data fetching, caching, mutation    |
| **React Toastify**       | ^9.2.2   | Toast notifications                 |
| **SweetAlert2**          | ^11.10.6 | Alert/confirmation modals           |
| **Framer Motion**        | ^11.0.2  | Animation library                   |
| **Firebase**             | ^10.7.2  | Authentication, Hosting             |
| **Stripe JS**            | ^1.61.0  | Payment handling                    |
| **React Icons**          | ^5.1.0   | Icon library                        |
| **Zod**                  | ^3.22.4  | Form validation schema (optional)   |

---

### 🧪 Backend (Node.js + Express + MongoDB)

| Library / Tool              | Version  | Purpose                       |
| --------------------------- | -------- | ----------------------------- |
| **Node.js**                 | ^20.x    | Server runtime                |
| **Express.js**              | ^4.18.2  | Web framework                 |
| **MongoDB (native driver)** | ^6.4.0   | NoSQL Database                |
| **Mongoose**                | ^7.6.1   | MongoDB ODM                   |
| **Cors**                    | ^2.8.5   | Cross-origin resource sharing |
| **Dotenv**                  | ^16.3.1  | Manage environment variables  |
| **Jsonwebtoken (JWT)**      | ^9.0.2   | Secure authentication         |
| **Stripe (server SDK)**     | ^12.10.0 | Stripe payment integration    |
| **Bcrypt.js**               | ^2.4.3   | (Optional) Password hashing   |
| **Cloudinary SDK**          | ^1.41.0  | (Optional) Image hosting      |

---

## 📁 Project Structure (Client)
