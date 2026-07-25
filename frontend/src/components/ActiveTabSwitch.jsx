import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex p-1 bg-base-200/50 rounded-xl overflow-hidden w-full max-w-sm mx-auto shadow-sm">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
          activeTab === "chats" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/80 hover:text-base-content"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 text-center py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
          activeTab === "contacts" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/80 hover:text-base-content"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
