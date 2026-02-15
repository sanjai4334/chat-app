import { useState } from "react";
import "./ChatFooter.css";
import type { ChatMessage } from "../../ChatPage";
import plusIcon from "../../../../../src/assets/plus.svg";
import sendIcon from "../../../../../src/assets/send.svg";

interface ChatFooterProps {
    sendMessage: (message: Omit<ChatMessage, "type">) => void;
}

const ChatFooter = ({ sendMessage }: ChatFooterProps) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        sendMessage({
            timeStamp: new Date(),
            content: {
                text: message,
            },
        });

        setMessage("");
    };

    return (
        <div className="footer">
            <div className="attach-file">
                <img src={plusIcon} />
            </div>
            <input
                type="text"
                name="message"
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-message" onClick={handleSend}>
                <img src={sendIcon} />
            </button>
        </div>
    );
};

export default ChatFooter;
