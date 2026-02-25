import { Server } from "socket.io";
import { ChatMessage } from "../types/chat";
import { onlineUsers, offlineMessageQueue } from "./state";

export function deliverOfflineMessages(
    io: Server,
    socketId: string,
    userId: string
) {
    if (!offlineMessageQueue[userId]) return;

    offlineMessageQueue[userId].forEach((msg) => {
        io.to(socketId).emit("receive_message", msg);
    });

    delete offlineMessageQueue[userId];
}

export function handleSendMessage(
    io: Server,
    socketId: string,
    data: ChatMessage
) {
    const receiverSocket = onlineUsers[data.chatId]?.socketId;

    if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", data);
    } else {
        offlineMessageQueue[data.chatId] = [
            ...(offlineMessageQueue[data.chatId] || []),
            data,
        ];
    }

    io.to(socketId).emit("receive_message", data);
}
