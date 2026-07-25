import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-2">
      {chats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        const unreadCount = chat.unreadCount || 0;

        return (
          <div
            key={chat._id}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent
              ${isSelected ? "bg-primary/20 border-primary/30" : "hover:bg-base-200"}
              ${unreadCount > 0 && !isSelected ? "bg-base-200/50" : ""}
            `}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3 relative">
              <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                <div className="size-12 rounded-full border border-base-300">
                  <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-semibold truncate ${unreadCount > 0 ? "text-base-content" : "text-base-content/80"}`}>
                    {chat.fullName}
                  </h4>
                  {chat.lastMessage && (
                    <span className="text-xs text-base-content/90 ml-2 shrink-0">
                      {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={`text-sm truncate flex items-center gap-1 ${unreadCount > 0 && !isSelected ? "font-semibold text-base-content" : "text-base-content/80"}`}>
                    {chat.lastMessage?.senderId === chat._id ? "" : chat.lastMessage ? "You: " : ""}
                    {chat.lastMessage?.text || (chat.lastMessage?.image ? (
                      <span className="flex items-center gap-1">
                        <Camera size={14} /> Photo
                      </span>
                    ) : "Start chatting")}
                  </p>
                  {unreadCount > 0 && !isSelected && (
                    <div className="badge badge-primary badge-sm self-end rounded-full font-bold">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatsList;
