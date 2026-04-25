import {
    useCallback,
    useEffect,
    useRef,
    type Dispatch,
    type SetStateAction,
} from "react";
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
    const pendingSeenMessageIds = useRef<Set<Message["id"]>>(new Set());
    const seenFlushTimer = useRef<number | undefined>(undefined);

    const flushSeenMessages = useCallback(() => {
        const messageIds = [...pendingSeenMessageIds.current];
        if (!messageIds.length) return;

        const payload: MessageEventEnvelope = {
            senderId: myUserInfo.id,
            chatId: user.id,

            event: {
                messageId: messageIds,

                type: "status_update",
                payload: {
                    status: "seen",
                },

                timestamp: new Date().toISOString(),
            },
        };

        socket.emit("mark_messages_read", payload);
        pendingSeenMessageIds.current.clear();

        setUnreadMessages((prev) => {
            const unreadIds = prev[user.id];
            if (!unreadIds?.length) return prev;

            const readIds = new Set(messageIds);
            const remainingUnreadIds = unreadIds.filter((id) => !readIds.has(id));

            if (!remainingUnreadIds.length) {
                return Object.fromEntries(
                    Object.entries(prev).filter(([chatId]) => chatId !== user.id)
                );
            }

            return {
                ...prev,
                [user.id]: remainingUnreadIds,
            };
        });
    }, [myUserInfo.id, setUnreadMessages, user.id]);

    const queueSeenMessage = useCallback(
        (messageId: Message["id"]) => {
            pendingSeenMessageIds.current.add(messageId);

            if (seenFlushTimer.current) {
                window.clearTimeout(seenFlushTimer.current);
            }

            seenFlushTimer.current = window.setTimeout(() => {
                flushSeenMessages();
                seenFlushTimer.current = undefined;
            }, 200);
        },
        [flushSeenMessages]
    );

    useEffect(() => {
        if (!chatContainer.current) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainer.current;

        const isScrollable = scrollHeight > clientHeight;

        if (!isScrollable) return;

        if (scrollTop + clientHeight >= scrollHeight - 300) {
            chatContainer.current?.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            if (seenFlushTimer.current) {
                window.clearTimeout(seenFlushTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        const container = chatContainer.current;
        const unreadIds = new Set(unreadMessages[user.id] || []);

        if (!container || !unreadIds.size) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || entry.intersectionRatio < 0.6) {
                        return;
                    }

                    const messageId =
                        entry.target.getAttribute("data-readable-message-id");

                    if (!messageId || !unreadIds.has(messageId)) return;

                    observer.unobserve(entry.target);
                    queueSeenMessage(messageId);
                });
            },
            {
                root: container,
                threshold: 0.6,
            }
        );

        container
            .querySelectorAll<HTMLElement>("[data-readable-message-id]")
            .forEach((element) => {
                const messageId = element.dataset.readableMessageId;

                if (messageId && unreadIds.has(messageId)) {
                    observer.observe(element);
                }
            });

        return () => {
            observer.disconnect();
        };
    }, [messages, queueSeenMessage, unreadMessages, user.id]);

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
