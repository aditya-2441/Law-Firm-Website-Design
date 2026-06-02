import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hello! How can I help you with your legal matter today?", sender: "bot" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thank you for your message. A legal expert will respond shortly. For immediate assistance, please call us or schedule a consultation.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Legal Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-600 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-950">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-white border border-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700 bg-slate-900 rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
