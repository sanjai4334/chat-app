import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";
import {
    useChatPage,
    type ChatMessageWithStatus,
    type User,
} from "./_hooks/useChatPage";
import type { Dispatch, SetStateAction } from "react";

export interface ChatPageProps {
    myUserInfo: Omit<User, "avatarUrl">;
    user: User;
    messages: ChatMessageWithStatus[];
    setMessages: Dispatch<SetStateAction<Record<string, ChatMessageWithStatus[]>>>;
}

const ChatPage = ({ myUserInfo, user, messages, setMessages }: ChatPageProps) => {
    const { sendMessage, chatContainer } = useChatPage({
        myUserInfo,
        user,
        messages,
        setMessages,
    });

    return (
        <div className="chat-page">
            <ChatHeader user={user} />

            <div className="chat-container" ref={chatContainer}>
                {messages.map((message, idx) => (
                    <ChatBubble
                        key={idx} // use message id instead
                        message={message}
                    />
                ))}
            </div>

            <ChatFooter sendMessage={sendMessage} />
        </div>
    );
};

export default ChatPage;
