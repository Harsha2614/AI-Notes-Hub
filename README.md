# AI Notes Hub 🚀

AI Notes Hub is a full-stack AI-powered notes application that allows users to securely create, manage, update, delete, and summarize notes using AI.

This project was built as a Full Stack Developer Internship assignment and demonstrates production-level development with authentication, protected routes, database integration, deployment, and AI-powered summarization.

---

# Live Demo

### Frontend (Vercel)

Add your deployed frontend link here

### Backend (Render)

Add your deployed backend link here

### GitHub Repository

Add your GitHub repository link here

---

# Features ✨

* User Signup & Login Authentication
* JWT-based Secure Authentication
* Protected Backend Routes
* Protected Frontend Routes
* Create Notes
* View Notes
* Update Notes
* Delete Notes
* Search Notes
* AI-Powered Note Summarization
* Beautiful Modern UI
* Responsive Design
* MongoDB Database Integration
* Production Deployment

---

# Tech Stack 🛠️

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

## AI Integration

* NVIDIA API (AI Summary Feature)

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

# Folder Structure 📁

```bash
AI-Notes-Hub/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Installation & Setup ⚙️

## 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Notes-Hub.git
cd AI-Notes-Hub
```

---

## 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file inside backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NVIDIA_API_KEY=your_nvidia_api_key
PORT=5000
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Update API URL inside:

```bash
src/api/axios.js
```

Use:

```javascript
baseURL: "http://localhost:5000/api"
```

For production, replace with your Render backend URL.

---

# Authentication Flow 🔐

1. User signs up
2. Password gets encrypted using bcrypt
3. JWT token is generated
4. Token is stored in localStorage
5. Protected routes require valid token access
6. Notes belong only to the authenticated user

---

# AI Summary Feature 🤖

Users can click:

### Summarize with AI

The app sends note content to NVIDIA AI API and returns a short professional summary instantly.

This makes the project stand out from normal CRUD applications.

---

# Screenshots 📸

Add screenshots here:

* Home Page
* Signup Page
* Login Page
* Dashboard
* Create Note
* AI Summary Feature

Example:

```md
![Dashboard](your-image-link)
```

---

# Future Improvements 🚀

* Dark Mode
* Note Categories Filter
* Rich Text Editor
* File Upload Support
* Export Notes as PDF
* AI Smart Suggestions
* Voice Notes
* Team Collaboration

---

# Author 👨‍💻

### Harsha

Full Stack Developer | React | Node.js | MongoDB | AI Integration

Built as part of Full Stack Developer Internship Assignment.

---

# License

This project is for educational and internship assignment purposes.

---

# Final Note

This project demonstrates:

* Full Stack Development
* Authentication System
* Production Deployment
* AI Integration
* Clean UI/UX
* Real-world Software Development Skills

This is not just a CRUD app — it is an AI-powered production-ready project.
