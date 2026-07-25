import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="p-3 rounded-xl cursor-pointer hover:bg-base-200 transition-colors border border-transparent"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full border border-base-300">
                <img src={contact.profilePic || "/avatar.png"} className="object-cover" />
              </div>
            </div>
            <h4 className="text-base-content font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ContactList;
