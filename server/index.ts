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

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
        io.emit("receive_message", { message: data, token: socket.id }); // broadcast
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => console.log("🚀 Socket server running on 5000"));
