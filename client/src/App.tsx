import "./App.css";
import ChatPage from "./pages/ChatPage/ChatPage";
import ChatList from "./pages/ChatList/ChatList";
import type { ChatMessage, User } from "./pages/ChatPage/_hooks/useChatPage";
import { useState } from "react";

function App() {
    const [users, setUsers] = useState<User[]>([]);

    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
    const [currentUser, setCurrentUser] = useState<User>();

    return (
        <div className="main">
            <ChatList users={users} setCurrentUser={setCurrentUser} />
            {currentUser && (
                <ChatPage
                    user={currentUser}
                    messages={messages[currentUser.id]}
                    setMessages={setMessages}
                />
            )}
        </div>
    );
}

export default App;
