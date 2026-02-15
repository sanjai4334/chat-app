import "./ChatBubble.css";
import type { ChatMessage } from "../../ChatPage";
import { formatTimeHrMin } from "../../utils/dateTimeUtils";

const ChatBubble = ({ content, timeStamp, type }: ChatMessage) => {
    return (
        <div className={`chat-bubble ${type}`}>
            <div className="text">{content.text}</div>
            <div className="time-stamp">{formatTimeHrMin(timeStamp)}</div>
        </div>
    );
};

export default ChatBubble;
