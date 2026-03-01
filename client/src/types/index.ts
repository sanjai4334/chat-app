export type MessageStatus = "pending" | "sent" | "delivered" | "seen";

export type MessageDTO = {
    id: string;
    content: { text: string };
    timestamp: Date;
};

export type Message =
    | (MessageDTO & { type: "sent"; status: MessageStatus })
    | (MessageDTO & { type: "received" });

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
    avatarUrl: string;
};

export type MessageEventType = "status_update" | "reaction" | "edit" | "delete";

export type MessageEvent = {
    messageId: string | string[];

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
};
