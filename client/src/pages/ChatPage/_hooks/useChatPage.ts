import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { socket } from "../../../socket";

export interface ChatMessage {
    id: string;
    content: { text: string };
    timestamp: Date;
    type?: "sent" | "received";
    tempId?: string;
}

export interface ChatMessageWithStatus extends ChatMessage {
    status: "pending" | "sent" | "delivered" | "seen";
}

export type User = {
    id: string;
    username: string;
    avatarUrl: string;
};

export const useChatPage = ({
    myUserInfo,
    user,
    messages,
    setMessages,
}: {
    myUserInfo: Omit<User, "avatarUrl">;
    user: User;
    messages: ChatMessage[];
    setMessages: Dispatch<
        SetStateAction<Record<string, ChatMessageWithStatus[]>>
    >;
}) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatContainer.current?.scrollTo({
            top: chatContainer.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = (message: ChatMessage) => {
        console.log("message: ", message);
        console.log("user: ", user);
        console.log("myUserInfo: ", myUserInfo);
        socket.emit("send_message", {
            senderId: myUserInfo.id,
            chatId: user.id,
            message,
        });

        setMessages((prev) => ({
            ...prev,
            [user.id]: [
                ...(prev[user.id] || []),
                {
                    ...message,
                    timestamp: new Date(message.timestamp),
                    type: "sent",
                    status: "sent",
                },
            ],
        }));
    };

    return {
        sendMessage,
        chatContainer,
    };
};
