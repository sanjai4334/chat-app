import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";

export type ChatMessage = {
    content: { text: string };
    timeStamp: Date;
    type: "sent" | "received";
};

export type User = {
    username: string;
    avatarUrl: string;
};

interface ChatPageProps {
    messages: ChatMessage[];
    user: User;
    sendMessage: (message: Omit<ChatMessage, "type">) => void;
}

const ChatPage = ({ messages, sendMessage }: ChatPageProps) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatContainer.current?.scrollTo({
            top: chatContainer.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="chat-page">
            <ChatHeader username={""} avatarUrl={""} />

            <div className="chat-container" ref={chatContainer}>
                {messages?.map((message, idx) => (
                    <ChatBubble
                        key={idx} // use message id instead
                        content={message.content}
                        timeStamp={message.timeStamp}
                        type={message.type}
                    />
                ))}
            </div>

            <ChatFooter sendMessage={sendMessage} />
        </div>
    );
};

interface SocketData {
    message: Omit<ChatMessage, "type">;
    token: Socket["id"];
}

export default ChatPage;

import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import type { Socket } from "socket.io-client";

const socket = io("http://localhost:5000");

export const ChatApp = () => {
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
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage: ChatPageProps["sendMessage"] = (message) => {
        socket.emit("send_message", message);
        // setMessages((prev) => [...prev, { ...message, type: "sent" }]);
    };

    return (
        <ChatPage
            messages={messages}
            user={{
                username: "",
                avatarUrl: "",
            }}
            sendMessage={sendMessage}
        />
    );
};
