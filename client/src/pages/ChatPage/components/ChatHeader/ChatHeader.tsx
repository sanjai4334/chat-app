import "./ChatHeader.css";
import type { User } from "../../ChatPage";
import avatarIcon from "../../../../../src/assets/profile-circle.svg";
import dotMenuIcon from "../../../../../src/assets/dot-menu.svg";

type ChatHeaderProps = User;

const ChatHeader = ({ username, avatarUrl }: ChatHeaderProps) => {
    return (
        <div className="header">
            <div className="avatar">
                <img src={avatarUrl || avatarIcon} alt="avatar" />
            </div>

            <div className="username">{username || "Unknown User"}</div>

            <div className="options">
                <img src={dotMenuIcon} />
            </div>
        </div>
    );
};

export default ChatHeader;
