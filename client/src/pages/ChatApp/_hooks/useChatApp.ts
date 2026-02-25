import { useEffect, useState } from "react";
import type { ChatMessage, User } from "../../ChatPage/_hooks/useChatPage";
import { socket } from "../../../socket";

interface SocketData {
    message: ChatMessage;
    senderId: string;
    chatId: string;
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

    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
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
                        timeStamp: new Date(data.message.timeStamp),
                        type:
                            data.senderId === myUserInfo.id
                                ? "sent"
                                : "received",
                    },
                ],
            }));
        };

        socket.on("users_update", handleUsers);
        socket.on("receive_message", handleMessages);

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
