import "./ChatListItem.css";
import AvatarIcon from "../../../../../src/assets/profile-circle.svg";
import type { User } from "../../../../types";

interface ChatListItemProps {
    user: User;
    onClickItem: (user: User) => void;
}

const ChatListItem = ({ user, onClickItem }: ChatListItemProps) => {
    return (
        <div className="chat-list-item" onClick={() => onClickItem(user)}>
            <div className="avatar">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="avatar" />
                ) : (
                    <AvatarIcon />
                )}
            </div>

            <div className="username">{user.username || "Unknown User"}</div>
        </div>
    );
};

export default ChatListItem;
