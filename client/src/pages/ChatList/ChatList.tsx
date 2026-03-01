import type { Dispatch, SetStateAction } from "react";
import "./ChatList.css";
import ChatListItem from "./components/ChatListItem/ChatListItem";
import type { User } from "../../types";

interface ChatListProps {
    users: User[];
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
}

const ChatList = ({ users, setCurrentUser }: ChatListProps) => {
    return (
        <div className="chat-list">
            {users.map((user) => (
                <ChatListItem
                    key={user.id}
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
