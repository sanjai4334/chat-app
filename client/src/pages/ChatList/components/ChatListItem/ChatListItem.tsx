import "./ChatListItem.css";
import avatarIcon from "../../../../../src/assets/profile-circle.svg";
import type { User } from "../../../ChatPage/_hooks/useChatPage";

interface ChatListItemProps {
    user: User;
    onClickItem: (user: User) => void;
}

const ChatListItem = ({
    user,
    onClickItem,
}: ChatListItemProps) => {
    return (
        <div className="chat-list-item" onClick={() => onClickItem(user)}>
            <div className="avatar">
                <img src={user.avatarUrl || avatarIcon} alt="avatar" />
            </div>

            <div className="username">{user.username || "Unknown User"}</div>
        </div>
    );
};

export default ChatListItem;
