import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";
import { useChatPage, type ChatMessage, type User } from "./_hooks/useChatPage";

export interface ChatPageProps {
    myUserInfo: Omit<User, "avatarUrl">;
    user: User;
    messages: ChatMessage[];
}

const ChatPage = ({ myUserInfo, user, messages }: ChatPageProps) => {
    const { sendMessage, chatContainer } = useChatPage({ myUserInfo, user, messages });

    return (
        <div className="chat-page">
            <ChatHeader user={user} />

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
