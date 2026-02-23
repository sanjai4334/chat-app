import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

export type ChatMessage = {
    content: { text: string };
    timeStamp: Date;
    type?: "sent" | "received";
};

export type User = {
    username: string;
    avatarUrl: string;
};

interface SocketData {
    message: ChatMessage;
    token: Socket["id"];
}

const socket = io("http://localhost:5000");
export const useChatPage = () => {
    const chatContainer = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        socket.on("receive_message", (data: SocketData) => {
            setMessages((prev) => [
                ...prev,
                {
                    ...data.message,
                    timeStamp: new Date(data.message.timeStamp),
                    type: data.token === socket.id ? "sent" : "received",
                },
            ]);
            chatContainer.current?.scrollTo({
                top: chatContainer.current.scrollHeight,
                behavior: "smooth",
            });
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = (message: ChatMessage) => {
        socket.emit("send_message", message);
        // setMessages((prev) => [...prev, { ...message, type: "sent" }]);
    };
    
    return {
        messages,
        sendMessage,
        chatContainer,
    };
};
