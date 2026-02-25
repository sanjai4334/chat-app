export type ChatMessage = {
    id: string;
    content: { text: string };
    timestamp: string;
    senderId: string;
    chatId: string;
};

export interface ChatMessageWithStatus extends ChatMessage {
    status: "pending" | "sent" | "delivered" | "seen";
}

export type User = {
    id: string;
    socketId: string;
};

export interface MessageEventPayload {
    messageId: string;
    tempId?: string;
    senderId: string;
    chatId: string;

    type: "status_update" | "reaction" | "edit" | "delete";

    data: {
        status?: ChatMessageWithStatus["status"];
        reaction?: string;
        editedData?: { text?: string };
    };

    timestamp: string;
}
