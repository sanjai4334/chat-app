import { useEffect, useState } from "react";
import type {
    ChatMessage,
    ChatMessageWithStatus,
    User,
} from "../../ChatPage/_hooks/useChatPage";
import { socket } from "../../../socket";

interface SocketData {
    message: ChatMessage;
    senderId: string;
    chatId: string;
}

interface MessageEventPayload {
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

    timestamp: Date;
}

const loadUser = () => {
    const saved = sessionStorage.getItem("chatUser");
    if (saved) return JSON.parse(saved);

    const username = prompt("Enter username") || "User";

    const user = {
        id: crypto.randomUUID(),
        username,
    };

    sessionStorage.setItem("chatUser", JSON.stringify(user));
    return user;
};

export const useChatApp = () => {
    const [users, setUsers] = useState<User[]>([]);

    const [messages, setMessages] = useState<
        Record<string, ChatMessageWithStatus[]>
    >({});
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const [myUserInfo] = useState(loadUser);

    useEffect(() => {
        socket.emit("register", myUserInfo);

        const handleUsers = (users: { id: string; username: string }[]) => {
            setUsers(
                users
                    .filter((user) => user.id !== myUserInfo.id)
                    .map((user) => ({ ...user, avatarUrl: "" }))
            );
        };

        const handleMessages = (data: SocketData) => {
            const chatKey =
                data.senderId === myUserInfo.id ? data.chatId : data.senderId;
            setMessages((prev) => ({
                ...prev,
                [chatKey]: [
                    ...(prev[chatKey] || []),
                    {
                        ...data.message,
                        timestamp: new Date(data.message.timestamp),
                        type:
                            data.senderId === myUserInfo.id
                                ? "sent"
                                : "received",
                        status: "sent",
                    },
                ],
            }));
        };

        // TODO: think of a way to use pending status

        const updateMessage = (eventData: MessageEventPayload) => {
            const {
                chatId,
                messageId,
                tempId,
                type,
                data: { status },
            } = eventData;
            const lookupId = tempId || messageId;

            switch (type) {
                case "status_update":
                    if (!status) return;
                    setMessages((messages) => {
                        const updateMessages = (messages[chatId] || []).map(
                            (message) => {
                                if (lookupId === message.id) {
                                    return {
                                        ...message,
                                        status: status,
                                        id: 
                                        messageId,
                                    };
                                } else return message;
                            }
                        );

                        return { ...messages, [chatId]: updateMessages };
                    });
                    return;
                case "reaction":
                    return;
                case "edit":
                    return;
                case "delete":
                    return;
            }
        };

        socket.on("users_update", handleUsers);
        socket.on("receive_message", handleMessages);
        socket.on("update_message", updateMessage);

        return () => {
            socket.off("users_update", handleUsers);
            socket.off("receive_message", handleMessages);
        };
    }, []);

    return {
        myUserInfo,
        users,
        currentUser,
        setCurrentUser,
        messages,
        setMessages,
    };
};
