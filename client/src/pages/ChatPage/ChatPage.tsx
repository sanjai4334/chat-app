import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";
import { useChatPage } from "./_hooks/useChatPage";
import type { Dispatch, SetStateAction } from "react";
import type { Message, User, UserDTO } from "../../types";

export interface ChatPageProps {
    myUserInfo: UserDTO;
    user: User;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Record<string, Message[]>>>;
    unreadMessages: Record<string, Message["id"][]>;
    setUnreadMessages: Dispatch<
        SetStateAction<Record<string, Message["id"][]>>
    >;
}

const ChatPage = ({
    myUserInfo,
    user,
    messages,
    setMessages,
    unreadMessages,
    setUnreadMessages,
}: ChatPageProps) => {
    const { sendMessage, chatContainer } = useChatPage({
        myUserInfo,
        user,
        messages,
        setMessages,
        unreadMessages,
        setUnreadMessages,
    });

    return (
        <div className="chat-page">
            <ChatHeader user={user} />

            <div className="chat-container" ref={chatContainer}>
                {messages.map((message) => (
                    <ChatBubble
                        key={message.id}
                        message={message}
                    />
                ))}
            </div>

            <ChatFooter sendMessage={sendMessage} />
        </div>
    );
};

export default ChatPage;
