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

export type ChatMessage = {
    content: { text: string };
    timeStamp: string;
    senderId: string;
    chatId: string;
};

export type User = {
    id: string;
    socketId: string;
};

const onlineUsers: Record<string, User> = {};
const offlineMessageQueue: Record<string, ChatMessage[]> = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (user: User) => {
        onlineUsers[user.id] = { ...user, socketId: socket.id };

        io.emit(
            "users_update",
            Object.values(onlineUsers).map((user) => {
                const { socketId, ...rest } = user;
                return rest;
            })
        );

        if (user.id in offlineMessageQueue) {
            offlineMessageQueue[user.id].forEach((message) => {
                io.to(socket.id).emit(
                    "receive_message",
                    message
                );
            });

            delete offlineMessageQueue[user.id];
        }
    });

    socket.on("send_message", (data: ChatMessage) => {
        const receiverSocket = onlineUsers[data.chatId]?.socketId;

        if (receiverSocket) {
            io.to(receiverSocket).emit("receive_message", data);
        } else {
            offlineMessageQueue[data.chatId] = [
                ...(offlineMessageQueue[data.chatId] || []),
                data,
            ];
        }

        socket.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        const user = Object.values(onlineUsers).find(
            (user) => user.socketId === socket.id
        );

        if (!user) return;

        delete onlineUsers[user.id];

        io.emit(
            "users_update",
            Object.values(onlineUsers).map((user) => {
                const { socketId, ...rest } = user;
                return rest;
            })
        );
        console.log("User disconnected", user.id);
    });
});

server.listen(5000, () => console.log("🚀 Socket server running on 5000"));
