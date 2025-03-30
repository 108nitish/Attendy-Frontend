# Attendy - Automated Attendance System (Frontend)

## 📌 Overview
Attendy is a **smart attendance system** designed for teachers, allowing them to create classes, manage students, and automate attendance using **facial recognition**. This frontend is built using **React.js**, with authentication and real-time attendance tracking.

## 🚀 Features
- 🔹 **User Authentication** (Login/Signup)
- 🔹 **Class Management** (Create, Delete Classes)
- 🔹 **Student Management** (Add)
- 🔹 **Automated Attendance** (Upload Class Photos for Face Recognition)
- 🔹 **Real-time Notifications** (via React Toastify)
- 🔹 **Responsive UI** (Optimized for all devices)

## 🛠️ Tech Stack
- **Frontend:** React.js, React Router 
- **State Management:** React Hooks
- **Authentication:** JWT (JSON Web Token)
- **API Calls:** Axios
- **Face Recognition:** Face API.js
- **Notifications:** React Toastify
- **Build Tool:** Vite
- **Linting & Code Quality:** ESLint

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/attendy-frontend.git
cd attendy-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start Development Server
```sh
npm run dev
```

### 4️⃣ Build for Production
```sh
npm run build
```

### 5️⃣ Preview Production Build
```sh
npm run preview
```
 

## 📂 Project Structure
```
frontend/
│-- src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Pages (Login, Dashboard, etc.)
│   ├── hooks/        # Custom hooks
│   ├── services/     # API Calls (Axios)
│   ├── context/      # Authentication & Global State
│   ├── assets/       # Images & Static Files
│   ├── App.jsx       # Main Application File
│   ├── main.jsx      # React Entry Point
│-- public/           # Static files
│-- package.json      # Dependencies & Scripts
│-- vite.config.js    # Vite Configuration
```

## 📜 Scripts
| Command         | Description |
|----------------|------------|
| `npm run dev`  | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

## 🔗 API Endpoints (Example)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User signup |
| `/api/classes` | GET | Fetch all classes |
| `/api/students` | GET | Fetch all students |
| `/api/attendance` | POST | Upload image for attendance |

## ✨ Contributors
- **Your Name** ([@yourgithub](https://github.com/108nitish))
 
--- 
