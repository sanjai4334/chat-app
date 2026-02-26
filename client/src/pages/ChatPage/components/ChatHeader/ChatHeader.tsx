import "./ChatHeader.css";
import AvatarIcon from "../../../../../src/assets/profile-circle.svg";
import DotMenuIcon from "../../../../../src/assets/dot-menu.svg";
import type { User } from "../../../../types";

const ChatHeader = ({ user }: { user: User }) => {
    return (
        <div className="header">
            <div className="avatar">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="avatar" />
                ) : (
                    <AvatarIcon />
                )}
            </div>

            <div className="username">{user.username || "Unknown User"}</div>

            <div className="options">
                <DotMenuIcon />
            </div>
        </div>
    );
};

export default ChatHeader;
