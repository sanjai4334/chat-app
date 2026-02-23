import {  useState } from "react";
import type { ChatFooterProps } from "../components/ChatFooter/ChatFooter";

export const useChatFooter = ({
    sendMessage,
}: {
    sendMessage: ChatFooterProps["sendMessage"];
}) => {
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

    return {
        message,
        setMessage,
        handleSend,
    };
};
