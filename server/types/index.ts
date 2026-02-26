export type MessageDTO = {
    id: string;
    content: { text: string };
    timestamp: string;
};

export type MessageEnvelope = {
    senderId: string;
    chatId: string;
    message: MessageDTO;
};

export type UserDTO = {
    id: string;
    username: string;
};

export type User = UserDTO & {
    socketId: string;
};

export type MessageStatus = "pending" | "sent" | "delivered" | "seen";

export type MessageEventType = "status_update" | "reaction" | "edit" | "delete";

export type MessageEvent = {
    messageId: string;

    type: MessageEventType;

    payload: {
        status?: MessageStatus;
        reaction?: string;
        editedData?: { text?: string };
    };

    timestamp: string;
};


export type MessageEventEnvelope = {
    senderId: string;
    chatId: string;
    
    event: MessageEvent;
}