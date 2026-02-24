import type { Dispatch, SetStateAction } from "react";
import type { User } from "../ChatPage/_hooks/useChatPage";
import "./ChatList.css";
import ChatListItem from "./components/ChatListItem/ChatListItem";

interface ChatListProps {
    users: User[];
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
}

const ChatList = ({ users, setCurrentUser }: ChatListProps) => {
    return (
        <div className="chat-list">
            {users.map((user) => (
                <ChatListItem
                    user={user}
                    onClickItem={(user: User) => {
                        setCurrentUser(user);
                    }}
                />
            ))}
        </div>
    );
};

export default ChatList;
