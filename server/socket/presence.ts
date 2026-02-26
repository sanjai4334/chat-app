import { onlineUsers } from "./state";
import { Server } from "socket.io";
import { UserDTO } from "../types";

export function registerUser(io: Server, socketId: string, user: UserDTO) {
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
