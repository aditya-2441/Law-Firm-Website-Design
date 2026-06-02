import { useState } from "react";
import { useNavigate } from "react-router";
import { Send, User, Paperclip, MoreVertical, Search } from "lucide-react";
import { Navbar } from "../components/Navbar";

interface Message {
  id: number;
  sender: "lawyer" | "client";
  senderName: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  clientName: string;
  lawyerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export function Conversations() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      clientName: "John Anderson",
      lawyerName: "Robert Williams",
      lastMessage: "Thank you for the update on my case.",
      lastMessageTime: "10:30 AM",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "lawyer",
          senderName: "Robert Williams",
          text: "Good morning John. I've reviewed your property dispute case.",
          timestamp: "9:15 AM",
        },
        {
          id: 2,
          sender: "client",
          senderName: "John Anderson",
          text: "Good morning. What are your thoughts?",
          timestamp: "9:20 AM",
        },
        {
          id: 3,
          sender: "lawyer",
          senderName: "Robert Williams",
          text: "I believe we have a strong case. I've prepared the necessary documents for filing. We should schedule a meeting to discuss the strategy.",
          timestamp: "9:45 AM",
        },
        {
          id: 4,
          sender: "client",
          senderName: "John Anderson",
          text: "That's great news! When would be a good time to meet?",
          timestamp: "10:15 AM",
        },
        {
          id: 5,
          sender: "lawyer",
          senderName: "Robert Williams",
          text: "How about Thursday at 2 PM? We can go through all the details then.",
          timestamp: "10:25 AM",
        },
        {
          id: 6,
          sender: "client",
          senderName: "John Anderson",
          text: "Thank you for the update on my case.",
          timestamp: "10:30 AM",
        },
      ],
    },
    {
      id: 2,
      clientName: "Sarah Martinez",
      lawyerName: "Jennifer Davis",
      lastMessage: "I have a question about the custody agreement.",
      lastMessageTime: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "client",
          senderName: "Sarah Martinez",
          text: "Hi Jennifer, I need some advice on the custody arrangement.",
          timestamp: "Yesterday 3:00 PM",
        },
        {
          id: 2,
          sender: "lawyer",
          senderName: "Jennifer Davis",
          text: "Of course, Sarah. What specific questions do you have?",
          timestamp: "Yesterday 3:15 PM",
        },
        {
          id: 3,
          sender: "client",
          senderName: "Sarah Martinez",
          text: "I have a question about the custody agreement.",
          timestamp: "Yesterday 3:30 PM",
        },
      ],
    },
    {
      id: 3,
      clientName: "Michael Chen",
      lawyerName: "David Martinez",
      lastMessage: "I'll send over the contract details shortly.",
      lastMessageTime: "2 days ago",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "lawyer",
          senderName: "David Martinez",
          text: "Michael, I've reviewed your business contract. There are a few clauses that need attention.",
          timestamp: "2 days ago 11:00 AM",
        },
        {
          id: 2,
          sender: "client",
          senderName: "Michael Chen",
          text: "Thanks for looking into it. Which clauses are concerning?",
          timestamp: "2 days ago 11:30 AM",
        },
        {
          id: 3,
          sender: "lawyer",
          senderName: "David Martinez",
          text: "I'll send over the contract details shortly.",
          timestamp: "2 days ago 12:00 PM",
        },
      ],
    },
  ];

  const currentConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      <Navbar isAuthenticated={true} userType="client" />

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 border-b border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors ${
                  selectedConversation === conv.id ? "bg-slate-800 border-l-4 border-l-amber-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-700 rounded-full p-2 flex-shrink-0">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{conv.clientName}</p>
                      <p className="text-sm text-slate-500">with {conv.lawyerName}</p>
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-amber-500 text-slate-900 text-xs px-2 py-1 rounded-full font-semibold">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-slate-600 mt-1">{conv.lastMessageTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {currentConversation ? (
          <div className="flex-1 flex flex-col bg-slate-950">
            {/* Chat Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">{currentConversation.clientName}</h2>
                <p className="text-sm text-slate-400">Lawyer: {currentConversation.lawyerName}</p>
              </div>
              <button className="text-slate-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md ${
                      message.sender === "client"
                        ? "bg-amber-500 text-slate-900"
                        : "bg-slate-800 text-white border border-slate-700"
                    } rounded-lg p-4`}
                  >
                    <p className="text-sm font-semibold mb-1 opacity-80">{message.senderName}</p>
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === "client" ? "text-slate-800 opacity-70" : "text-slate-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-slate-900 border-t border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <button className="text-slate-400 hover:text-amber-500">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-amber-500 text-slate-900 p-3 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
