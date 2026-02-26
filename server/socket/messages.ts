import { Server } from "socket.io";
import { onlineUsers, offlineMessageQueue } from "./state";
import {
    MessageEnvelope,
    MessageEvent,
    MessageEventEnvelope,
    MessageEventType,
    User,
} from "../types";

export function deliverOfflineMessages(
    io: Server,
    socketId: string,
    userId: User["id"]
) {
    if (!offlineMessageQueue[userId]) return;

    const sender = onlineUsers[offlineMessageQueue[userId][0].senderId];

    offlineMessageQueue[userId].forEach((msg) => {
        io.to(socketId).emit("receive_message", msg);

        if (sender) {
            handleUpdateMessage(io, sender.socketId, msg, "status_update", {
                status: "delivered",
            });
        }
    });

    delete offlineMessageQueue[userId];
}

export function handleSendMessage(
    io: Server,
    socketId: string,
    envelope: MessageEnvelope
) {
    const receiverSocket = onlineUsers[envelope.chatId]?.socketId;

    if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", envelope);

        handleUpdateMessage(io, socketId, envelope, "status_update", {
            status: "sent",
        });
        handleUpdateMessage(io, socketId, envelope, "status_update", {
            status: "delivered",
        });
    } else {
        handleUpdateMessage(io, socketId, envelope, "status_update", {
            status: "sent",
        });
        offlineMessageQueue[envelope.chatId] = [
            ...(offlineMessageQueue[envelope.chatId] || []),
            envelope,
        ];
    }
}

export function handleUpdateMessage(
    io: Server,
    socketId: string,
    envelope: MessageEnvelope,
    type: MessageEventType,
    payload: MessageEvent["payload"]
) {
    const isDeliveryAck = type === "status_update" && payload.status === "sent";

    const eventEnvelope: MessageEventEnvelope = {
        senderId: isDeliveryAck ? envelope.chatId : envelope.senderId,

        chatId: envelope.chatId,

        event: {
            messageId: envelope.message.id,

            type,
            payload,
            timestamp: envelope.message.timestamp,
        },
    };

    io.to(socketId).emit("update_message", eventEnvelope);
}
