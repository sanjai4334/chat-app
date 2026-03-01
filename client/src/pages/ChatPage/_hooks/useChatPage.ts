import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { socket } from "../../../socket";
import type {
    Message,
    MessageDTO,
    MessageEventEnvelope,
    User,
    UserDTO,
} from "../../../types";

export const useChatPage = ({
    myUserInfo,
    user,
    messages,
    setMessages,
    unreadMessages,
    setUnreadMessages,
}: {
    myUserInfo: UserDTO;
    user: User;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Record<string, Message[]>>>;
    unreadMessages: Record<string, Message["id"][]>;
    setUnreadMessages: Dispatch<
        SetStateAction<Record<string, Message["id"][]>>
    >;
}) => {
    const chatContainer = useRef<HTMLDivElement>(null);

    const markAsRead = () => {
        const unreadIds = unreadMessages[user.id];
        if (!unreadIds?.length) return;

        const uniqueMessageIds = [...new Set(unreadIds)];

        const payload: MessageEventEnvelope = {
            senderId: myUserInfo.id,
            chatId: user.id,

            event: {
                messageId: uniqueMessageIds,

                type: "status_update",
                payload: {
                    status: "seen",
                },

                timestamp: new Date().toISOString(),
            },
        };

        socket.emit("mark_messages_read", payload);

        setUnreadMessages((prev) =>
            Object.fromEntries(
                Object.entries(prev).filter(([chatId]) => chatId !== user.id)
            )
        );
    };

    useEffect(() => {
        if (!chatContainer.current) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainer.current;

        const isScrollable = scrollHeight > clientHeight;

        if (!isScrollable) {
            markAsRead();
            return;
        }

        if (scrollTop + clientHeight >= scrollHeight - 300) {
            chatContainer.current?.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    useEffect(() => {
        const element = chatContainer.current;
        if (!element) return;

        element.onscroll = () => {
            if (!chatContainer.current) return;
            const { scrollTop, scrollHeight, clientHeight } =
                chatContainer.current;

            if (scrollTop + clientHeight >= scrollHeight) {
                markAsRead();
            }
        };
        return () => {
            element.onscroll = null;
        };
    }, []);

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
                    status: "pending",
                },
            ],
        }));
    };

    return {
        sendMessage,
        chatContainer,
    };
};
