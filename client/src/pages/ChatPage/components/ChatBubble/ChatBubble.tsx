import "./ChatBubble.css";
import type { ChatMessage } from "../../ChatPage";
import { formatTimeHrMin } from "../../utils/dateTimeUtils";
import { useState } from "react";

const WORD_LIMIT = 135;

const ChatBubble = ({ content, timeStamp, type }: ChatMessage) => {
    const isLong = content.text.length > WORD_LIMIT;
    const [isClamped, setIsClamped] = useState(isLong);

    const displayText = isClamped
        ? content.text.slice(0, WORD_LIMIT) + "…"
        : content.text;

    const toggleLabel =  `Show ${isClamped ? "More" : "Less"}`;

    return (
        <div className={`chat-bubble ${type}`}>
            <div className="text">
                {displayText}

                {isLong && (
                    <span
                        className="clamp-control"
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsClamped((prev) => !prev)}
                    >
                        {toggleLabel}
                    </span>
                )}
            </div>

            <div className="time-stamp">{formatTimeHrMin(timeStamp)}</div>
        </div>
    );
};

export default ChatBubble;
