import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";
import { useChatPage, type ChatMessage, type User } from "./_hooks/useChatPage";
import type { Dispatch, SetStateAction } from "react";

export interface ChatPageProps {
    user: User;
    messages: ChatMessage[];
    setMessages: Dispatch<SetStateAction<Record<string, ChatMessage[]>>>;
}

const ChatPage = ({ user, messages, setMessages }: ChatPageProps) => {
    const { sendMessage, chatContainer } = useChatPage({
        user,
        setMessages,
    });

    return (
        <div className="chat-page">
            <ChatHeader username={""} avatarUrl={""} id={""} />

            <div className="chat-container" ref={chatContainer}>
                {messages.map((message, idx) => (
                    <ChatBubble
                        key={idx} // use message id instead
                        content={message.content}
                        timeStamp={message.timeStamp}
                        type={message.type}
                    />
                ))}
            </div>

            <ChatFooter sendMessage={sendMessage} />
        </div>
    );
};

export default ChatPage;
