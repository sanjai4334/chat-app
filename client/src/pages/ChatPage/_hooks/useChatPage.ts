import { useEffect, useRef } from "react";
import { socket } from "../../../socket";

export type ChatMessage = {
    content: { text: string };
    timeStamp: Date;
    type?: "sent" | "received";
};

export type User = {
    id: string;
    username: string;
    avatarUrl: string;
};

export const useChatPage = ({
    myUserInfo,
    user,
    messages,
}: {
    myUserInfo: Omit<User, "avatarUrl">;
    user: User;
    messages: ChatMessage[];
}) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatContainer.current?.scrollTo({
            top: chatContainer.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = (message: ChatMessage) => {
        console.log("user: ", user);
        console.log("myUserInfo: ", myUserInfo);
        socket.emit("send_message", {
            senderId: myUserInfo.id,
            chatId: user.id,
            message,
        });
        // setMessages((prev) => [...prev, { ...message, type: "sent" }]);
    };

    return {
        sendMessage,
        chatContainer,
    };
};
