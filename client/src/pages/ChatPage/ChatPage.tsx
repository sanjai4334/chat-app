import "./ChatPage.css";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import ChatBubble from "./components/ChatBubble/ChatBubble";
import { useChatPage } from "./_hooks/useChatPage";

const ChatPage = () => {
    const { messages, sendMessage, chatContainer } = useChatPage();

    return (
        <div className="chat-page">
            <ChatHeader username={""} avatarUrl={""} />

            <div className="chat-container" ref={chatContainer}>
                {messages?.map((message, idx) => (
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
