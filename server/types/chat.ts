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
