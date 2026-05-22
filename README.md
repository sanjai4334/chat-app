# Real-Time Chat App

A full-stack real-time chat application powered by **Node.js, Socket.io, React, and pnpm workspaces**.

This project demonstrates real-time communication using WebSockets and a modern frontend architecture.

---

## 🧰 Tech Stack

### Frontend

-   React (Vite)
-   TypeScript
-   Socket.io Client

### Backend

-   Node.js
-   Express
-   Socket.io

### Tooling

-   pnpm workspaces
-   nodemon

---

## 📁 Project Structure

```text
chat-app/
│
├── client/        # React + Vite frontend
├── server/        # Socket.io backend
├── docs/          # Architecture & schema documentation
└── package.json   # workspace root
```

---

## 📚 Documentation

Project architecture and system design documentation lives inside:

```text
docs/
```

### Current Documentation

```text
docs/
│
├── schema/
│   ├── overview.md
│   ├── user.md
│   ├── chat.md
│   ├── message.md
│   ├── reactions.md
│   └── receipts.md
│
└── decisions/
    ├── aggregation-strategy.md
    └── hybrid-normalization.md
```

### Documentation Goals

-   Maintain clear architecture decisions
-   Document schema evolution
-   Reduce realtime system complexity
-   Keep backend/frontend contracts explicit
-   Visualize flows using Mermaid diagrams

### Mermaid Support

Documentation uses:

-   Markdown
-   Mermaid diagrams

Recommended VSCode extensions:

-   Markdown Preview Mermaid Support
-   Markdown All in One

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sanjai4334/chat-app.git
cd chat-app
```

---

### 2️⃣ Install dependencies

```bash
pnpm install
```

---

### 3️⃣ Start the backend

```bash
pnpm --filter server dev
```

---

### 4️⃣ Start the frontend

```bash
pnpm --filter client dev
```

Open in browser:

```text
http://localhost:5173
```

---

## 🙌 Author

Built while learning and exploring:

-   real-time systems
-   WebSocket architecture
-   scalable chat application design
-   frontend/backend synchronization
-   realtime state management

---
