import "./ChatBubble.css";
import { formatTimeHrMin } from "../../utils/dateTimeUtils";
import { useState, type ReactNode } from "react";
import PendingIcon from "../../../../assets/pending.svg";
import TickSingle from "../../../../assets/tick-single.svg";
import TickDouble from "../../../../assets/tick-double.svg";
import type { Message, MessageStatus } from "../../../../types";

const WORD_LIMIT = 135;

const STATUS_ICON_MAP: Record<MessageStatus, ReactNode> = {
    pending: <PendingIcon className="delivery-indicator" />,
    sent: <TickSingle className="delivery-indicator" />,
    delivered: <TickDouble className="delivery-indicator" />,
    seen: <TickDouble className="delivery-indicator seen" />,
};

const ChatBubble = ({ message }: { message: Message }) => {
    const { content, timestamp, type } = message;

    const isLong = content.text.length > WORD_LIMIT;
    const [isClamped, setIsClamped] = useState(isLong);

    const displayText = isClamped
        ? content.text.slice(0, WORD_LIMIT) + "…"
        : content.text;

    const toggleLabel = `Show ${isClamped ? "More" : "Less"}`;

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

            <div className="sub">
                {type === "sent" && STATUS_ICON_MAP[message.status]}

                <div className="time-stamp">{formatTimeHrMin(timestamp)}</div>
            </div>
        </div>
    );
};

export default ChatBubble;
