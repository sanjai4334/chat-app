import { Server } from "socket.io";
import {
    ChatMessage,
    ChatMessageWithStatus,
    MessageEventPayload,
} from "../types/chat";
import { onlineUsers, offlineMessageQueue } from "./state";

export function deliverOfflineMessages(
    io: Server,
    socketId: string,
    userId: string
) {
    if (!offlineMessageQueue[userId]) return;

    const sender = onlineUsers[offlineMessageQueue[userId][0].senderId];
    console.log("sender: ", sender);

    offlineMessageQueue[userId].forEach((msg) => {
        io.to(socketId).emit("receive_message", msg);

        if (sender) {
            handleUpdateMessage(
                msg as ChatMessageWithStatus,
                io,
                sender.socketId
            );
        }
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
        handleUpdateMessage(data as ChatMessageWithStatus, io, socketId);
    } else {
        offlineMessageQueue[data.chatId] = [
            ...(offlineMessageQueue[data.chatId] || []),
            data,
        ];
    }

}

export function handleUpdateMessage(
    message: any,
    io: Server,
    socketId: string
) {
    console.log("message: ", message);
    const payload: MessageEventPayload = {
        messageId:
            message.status === "sent"
                ? crypto.randomUUID()
                : message.message.id,
        ...(message.status === "sent" ? { tempId: message.id } : {}),
        senderId: message.senderId,
        chatId: message.chatId,

        type: "status_update",

        data: {
            status: "delivered",
        },

        timestamp: message.message.timestamp,
    };
    console.log("payload: ", payload);

    io.to(socketId).emit("update_message", payload);
}
