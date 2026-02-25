import "./ChatFooter.css";
import PlusIcon from "../../../../../src/assets/plus.svg";
import SendIcon from "../../../../../src/assets/send.svg";
import type { ChatMessage } from "../../_hooks/useChatPage";
import { useChatFooter } from "../../_hooks/useChatFooter";

export interface ChatFooterProps {
    sendMessage: (message: ChatMessage) => void;
}

const ChatFooter = ({ sendMessage }: ChatFooterProps) => {
    const { message, setMessage, handleSend } = useChatFooter({ sendMessage });

    return (
        <div className="footer">
            <div className="attach-file">
                <PlusIcon />
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
                <SendIcon />
            </button>
        </div>
    );
};

export default ChatFooter;
