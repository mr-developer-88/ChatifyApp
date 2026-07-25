import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* LEFT SIDE (SIDEBAR) */}
      <div 
        className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-base-300 transition-all duration-300 bg-base-100/50 backdrop-blur-xl z-20 shadow-xl
        ${selectedUser ? 'hidden md:flex' : 'flex'} shrink-0`}
      >
        <ProfileHeader />
        <div className="px-4 py-2 border-b border-base-300">
          <ActiveTabSwitch />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </div>

      {/* RIGHT SIDE (CHAT) */}
      <div 
        className={`flex-1 flex flex-col bg-base-200/50 backdrop-blur-xl relative transition-all duration-300 
        ${!selectedUser ? 'hidden md:flex' : 'flex'}`}
      >
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
}
export default ChatPage;