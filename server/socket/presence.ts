import { onlineUsers } from "./state";
import { User } from "../types/chat";
import { Server } from "socket.io";

export function registerUser(io: Server, socketId: string, user: User) {
    onlineUsers[user.id] = { ...user, socketId };

    io.emit(
        "users_update",
        Object.values(onlineUsers).map(({ socketId, ...rest }) => rest)
    );
}

export function removeUser(io: Server, socketId: string) {
    const user = Object.values(onlineUsers).find(
        (u) => u.socketId === socketId
    );
    if (!user) return;

    delete onlineUsers[user.id];

    io.emit(
        "users_update",
        Object.values(onlineUsers).map(({ socketId, ...rest }) => rest)
    );
}
