import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { socket } from "../../../socket";
import type { Message, MessageDTO, User, UserDTO } from "../../../types";

export const useChatPage = ({
    myUserInfo,
    user,
    messages,
    setMessages,
}: {
    myUserInfo: UserDTO;
    user: User;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Record<string, Message[]>>>;
}) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatContainer.current?.scrollTo({
            top: chatContainer.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const sendMessage = (message: MessageDTO) => {
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
