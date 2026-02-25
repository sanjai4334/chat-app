import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { registerUser, removeUser } from "./socket/presence";
import { deliverOfflineMessages, handleSendMessage } from "./socket/messages";
import { User, ChatMessage } from "./types/chat";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (user: User) => {
        registerUser(io, socket.id, user);
        deliverOfflineMessages(io, socket.id, user.id);
    });

    socket.on("send_message", (data: ChatMessage) => {
        handleSendMessage(io, socket.id, data);
    });

    socket.on("disconnect", () => {
        removeUser(io, socket.id);
    });
});

server.listen(5000, () => console.log("🚀 Socket server running on 5000"));
