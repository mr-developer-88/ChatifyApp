import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { XIcon, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const  {onlineUsers} = useAuthStore();
    const isOnline = selectedUser?._id ? onlineUsers.includes(String(selectedUser._id)) : false;

    if(!selectedUser) return null;

    useEffect(() => {

        const handleEscKey = (event) => {
            if(event.key === "Escape") setSelectedUser(null)
        }
        window.addEventListener("keydown", handleEscKey)

        // cleanup function
        return () => window.removeEventListener("keydown", handleEscKey)
    }, [setSelectedUser])
  return (
    <div className='flex justify-between items-center bg-base-100/30 border-b border-base-300 min-h-[84px] px-4 md:px-6 shrink-0'>
        <div className="flex items-center space-x-3">
            <button 
              className="md:hidden p-2 -ml-2 text-base-content/90 hover:text-base-content hover:bg-base-200 rounded-full transition-colors"
              onClick={() => setSelectedUser(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className='w-10 md:w-12 rounded-full border border-base-300'>
                    <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="object-cover" />
                </div>
            </div>

            <div className="min-w-0">
                <h3 className="text-base-content font-semibold truncate">{selectedUser.fullName}</h3>
                <p className='text-base-content/80 text-xs md:text-sm'>{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>

        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 -mr-2 text-base-content/90 hover:text-base-content hover:bg-base-200 rounded-full transition-colors hidden md:block"
        >
            <XIcon className='w-5 h-5'/>
        </button>
    </div>
  )
}

export default ChatHeader
