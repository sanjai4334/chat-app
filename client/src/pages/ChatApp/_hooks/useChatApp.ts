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
    const [unreadMessages, setUnreadMessages] = useState<
        Record<MessageEnvelope["chatId"], Message["id"][]>
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

            if (!isOwnMessage) {
                setUnreadMessages((prev) => {
                    if ((prev[chatKey] || []).includes(data.message.id)) {
                        return prev;
                    }

                    return {
                        ...prev,
                        [chatKey]: [...(prev[chatKey] || []), data.message.id],
                    };
                });
            }
        };

        const updateMessage = (envelope: MessageEventEnvelope) => {
            const {
                senderId,
                chatId,

                event: { messageId, type, payload },
            } = envelope;

            const chatKey = senderId === myUserInfo.id ? chatId : senderId;

            const { status } = payload;

            switch (type) {
                case "status_update":
                    if (!status) return;
                    setMessages((messages) => {
                        const updateMessages = (messages[chatKey] || []).map(
                            (message) => {
                                if (messageId === message.id) {
                                    return {
                                        ...message,
                                        status: status,
                                    };
                                } else return message;
                            }
                        );

                        return { ...messages, [chatKey]: updateMessages };
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

        // const markMessagesRead = (envelope: MessageEventEnvelope) => {
        //     messages.
        // }

        socket.on("users_update", handleUsers);
        socket.on("receive_message", handleMessages);
        socket.on("update_message", updateMessage);
        // socket.on("mark_messages_read", markMessagesRead);

        return () => {
            socket.off("users_update", handleUsers);
            socket.off("receive_message", handleMessages);
            socket.off("update_message", updateMessage);
        };
    }, []);

    return {
        myUserInfo,
        users,
        currentUser,
        setCurrentUser,
        messages,
        setMessages,
        unreadMessages,
        setUnreadMessages,
    };
};
