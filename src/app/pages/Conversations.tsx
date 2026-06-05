import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  Search, 
  ShieldCheck, 
  MoreVertical,
  Briefcase,
  Lock
} from "lucide-react";
import { Navbar } from "../components/Navbar";

// Define the shape of our chat contacts
interface Contact {
  id: number;
  name: string;
  roleInfo: string; 
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

// Define the shape of a message
interface Message {
  id: number;
  text: string;
  senderRole: "client" | "lawyer";
  time: string;
}

export function Conversations() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 1. Get the current user's perspective
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [userType, setUserType] = useState<"client" | "lawyer" | null>(() => {
    return localStorage.getItem("userType") as "client" | "lawyer" | null;
  });

  const [messageInput, setMessageInput] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Scroll to bottom of chat automatically
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 2. Mock Data: Conditional contacts based on who is viewing
  const contacts: Contact[] = userType === "lawyer" 
    ? [
        { id: 1, name: "Rajesh Kumar", roleInfo: "Property Dispute", lastMessage: "Are there any missing papers?", time: "10:15 AM", unread: 1, isOnline: true },
        { id: 2, name: "Anita Desai", roleInfo: "Mutual Divorce", lastMessage: "I will upload the forms today.", time: "Yesterday", unread: 0, isOnline: false },
      ]
    : [
        { id: 1, name: "Adv. Amit Patel", roleInfo: "Real Estate & Property", lastMessage: "Are there any missing papers?", time: "10:15 AM", unread: 0, isOnline: true },
        { id: 2, name: "Adv. Priya Sharma", roleInfo: "Divorce & Family Law", lastMessage: "I will review the forms today.", time: "Yesterday", unread: 0, isOnline: false },
      ];

  const [activeContact, setActiveContact] = useState<Contact>(contacts[0]);

  // 3. NEW: Dictionary holding unique chat histories for each Contact ID
  const [chatHistories, setChatHistories] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: "Hello! I have reviewed the initial documents you provided on the portal.", senderRole: "lawyer", time: "10:00 AM" },
      { id: 2, text: "Thank you for the quick response. Are there any missing papers?", senderRole: "client", time: "10:15 AM" },
      { id: 3, text: "We will need the original sale deed. Please upload it securely when you have a chance.", senderRole: "lawyer", time: "10:30 AM" },
    ],
    2: [
      { id: 1, text: "Good morning. Do we have an update on the court filing?", senderRole: "client", time: "09:00 AM" },
      { id: 2, text: "I just checked the portal. I will upload the forms today and we should have a date by Friday.", senderRole: "lawyer", time: "09:30 AM" },
    ]
  });

  // 4. Extract the messages for only the person we are currently looking at
  const currentMessages = chatHistories[activeContact.id] || [];

  // Scroll to bottom when loading, sending a message, or SWITCHING contacts!
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeContact.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !userType) return;

    const newMessage: Message = {
      id: Date.now(), // Uses a timestamp so IDs are always unique
      text: messageInput,
      senderRole: userType, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update the specific chat history for the active contact
    setChatHistories(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));
    
    setMessageInput("");
  };

  if (!isAuthenticated || !userType) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        userType={userType} 
        onLogout={() => {
          setIsAuthenticated(false);
          setUserType(null);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userType");
          navigate("/");
        }} 
      />

      {/* Main Chat Interface - Full height minus Navbar */}
      <div className="flex-1 container mx-auto px-4 py-6 flex h-[calc(100vh-80px)]">
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex shadow-2xl">
          
          {/* LEFT SIDEBAR: Contacts List */}
          <div className="w-full md:w-1/3 border-r border-slate-800 flex flex-col bg-slate-900/50">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white mb-4">
                {userType === "lawyer" ? "My Clients" : "My Legal Team"}
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => setActiveContact(contact)}
                  className={`p-4 border-b border-slate-800 cursor-pointer transition-colors flex items-start gap-3 ${
                    activeContact.id === contact.id ? "bg-slate-800 border-l-4 border-l-amber-500" : "hover:bg-slate-800/50 border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-amber-500 font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Contact Preview */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-white font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-slate-500 flex-shrink-0">{contact.time}</span>
                    </div>
                    <p className="text-xs text-amber-500 mb-1 flex items-center gap-1">
                      {userType === "lawyer" ? <Briefcase className="w-3 h-3"/> : <ShieldCheck className="w-3 h-3"/>}
                      {contact.roleInfo}
                    </p>
                    <p className="text-sm text-slate-400 truncate">{contact.lastMessage}</p>
                  </div>

                  {/* Unread Badge */}
                  {contact.unread > 0 && activeContact.id !== contact.id && (
                    <div className="bg-amber-500 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANE: Active Chat */}
          <div className="hidden md:flex w-2/3 flex-col bg-slate-950 relative">
            
            {/* Chat Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-amber-500 font-bold">
                  {activeContact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    {activeContact.name}
                    {userType === "client" && (
                      <span title="Verified Lawyer" className="flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeContact.isOnline ? (
                       <span className="text-emerald-500">Online</span>
                    ) : (
                       "Offline"
                    )}
                    {" • "}{activeContact.roleInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-amber-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="text-slate-400 hover:text-amber-500 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-slate-700 mx-2"></div>
                <button className="text-slate-400 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* End-to-End Encryption Banner */}
            <div className="bg-slate-900/80 border-b border-slate-800 p-2 flex justify-center">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Messages are securely encrypted and protected under attorney-client privilege.
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {currentMessages.map((msg) => {
                // Determine if this message was sent by the person currently looking at the screen
                const isMine = msg.senderRole === userType;

                return (
                  <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                      isMine 
                        ? "bg-amber-500 text-slate-950 rounded-br-none" 
                        : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] mt-2 block ${isMine ? "text-slate-800" : "text-slate-500"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Invisible div to help us scroll to the bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button type="button" className="text-slate-400 hover:text-amber-500 transition-colors p-2 bg-slate-800 rounded-full">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                
                <button 
                  type="submit" 
                  disabled={!messageInput.trim()}
                  className="bg-amber-500 text-slate-900 p-3 rounded-full hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}