import "./ChatHeader.css";
import avatarIcon from "../../../../../src/assets/profile-circle.svg";
import dotMenuIcon from "../../../../../src/assets/dot-menu.svg";
import type { User } from "../../_hooks/useChatPage";

const ChatHeader = ({ user }: { user: User }) => {
    return (
        <div className="header">
            <div className="avatar">
                <img src={user.avatarUrl || avatarIcon} alt="avatar" />
            </div>

            <div className="username">{user.username || "Unknown User"}</div>

            <div className="options">
                <img src={dotMenuIcon} />
            </div>
        </div>
    );
};

export default ChatHeader;
