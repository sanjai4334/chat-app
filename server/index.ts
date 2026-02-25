import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const onlineUsers: Record<string, Record<string, string>> = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (user) => {
        onlineUsers[user.id] = { ...user, socketId: socket.id };
        io.emit(
            "users_update",
            Object.values(onlineUsers).map((user) => {
                const { socketId, ...rest } = user;
                return rest;
            })
        );
    });

    socket.on("send_message", (data) => {
        const receiverSocket = onlineUsers[data.chatId].socketId;

        io.to(receiverSocket).emit("receive_message", data);
        socket.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        const userId = Object.values(onlineUsers).filter(
            (user) => user.socketId === socket.id
        )[0]?.id;

        if (!userId) return;

        delete onlineUsers[userId];

        io.emit(
            "users_update",
            Object.values(onlineUsers).map((user) => {
                const { socketId, ...rest } = user;
                return rest;
            })
        );
        console.log("User disconnected", userId);
    });
});

server.listen(5000, () => console.log("🚀 Socket server running on 5000"));
