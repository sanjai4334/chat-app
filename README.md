# Real-Time Chat App

A full-stack real-time chat application powered by **Node.js, Socket.io, React, and pnpm workspaces**.

This project demonstrates real-time communication using WebSockets and a modern frontend architecture.

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Socket.io Client

### Backend

* Node.js
* Express
* Socket.io

### Tooling

* pnpm workspaces
* nodemon

---

## 📁 Project Structure

```
chat-app/
│
├── client/        # React + Vite frontend
├── server/        # Socket.io backend
└── package.json   # workspace root
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/chat-app.git
cd chat-app
```

---

### 2️⃣ Install dependencies

```
pnpm install
```

---

### 3️⃣ Start the backend

```
pnpm --filter chat-server dev
```

---

### 4️⃣ Start the frontend

```
pnpm --filter client dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🙌 Author

Built while learning and exploring real-time systems and WebSocket architecture.

---
