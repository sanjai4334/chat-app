import "./ChatApp.css";
import ChatList from "../ChatList/ChatList";
import ChatPage from "../ChatPage/ChatPage";
import { useChatApp } from "./_hooks/useChatApp";
import ChatPageFallback from "../ChatPage/ChatPageFallback";

const ChatApp = () => {
    const {
        myUserInfo,
        users,
        currentUser,
        setCurrentUser,
        messages,
        setMessages,
        unreadMessages,
        setUnreadMessages,
    } = useChatApp();

    return (
        <div className="main">
            <ChatList users={users} setCurrentUser={setCurrentUser} />
            {currentUser ? (
                <ChatPage
                    myUserInfo={myUserInfo}
                    user={currentUser}
                    messages={messages[currentUser.id] || []}
                    setMessages={setMessages}
                    unreadMessages={unreadMessages}
                    setUnreadMessages={setUnreadMessages}
                />
            ) : (
                <ChatPageFallback />
            )}
        </div>
    );
};

export default ChatApp;
