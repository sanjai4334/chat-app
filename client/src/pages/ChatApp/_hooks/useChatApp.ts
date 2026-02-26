import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import type {
    Message,
    MessageEnvelope,
    MessageEventEnvelope,
    User,
    UserDTO,
} from "../../../types";

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
        Record<MessageEnvelope["chatId"], Message[]>
    >({});
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const [myUserInfo] = useState(loadUser);

    useEffect(() => {
        socket.emit("register", myUserInfo);

        const handleUsers = (users: UserDTO[]) => {
            setUsers(
                users
                    .filter((user) => user.id !== myUserInfo.id)
                    .map((user) => ({ ...user, avatarUrl: "" }))
            );
        };

        const handleMessages = (data: MessageEnvelope) => {
            const isOwnMessage = data.senderId === myUserInfo.id;

            const chatKey =
                data.senderId === myUserInfo.id ? data.chatId : data.senderId;

            const baseMsg = {
                ...data.message,
                timestamp: new Date(data.message.timestamp),
            };

            const newMessage: Message = isOwnMessage
                ? {
                      ...baseMsg,
                      type: "sent",
                      status: "pending",
                  }
                : {
                      ...baseMsg,
                      type: "received",
                  };

            setMessages((prev) => ({
                ...prev,
                [chatKey]: [...(prev[chatKey] || []), newMessage],
            }));
        };

        // TODO: think of a way to use pending status

        const updateMessage = (envelope: MessageEventEnvelope) => {
            const {
                // senderId,
                chatId,

                event: {
                    messageId,
                    tempId,
                    type,
                    payload: { status },
                },
            } = envelope;
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
                                        id: messageId,
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
