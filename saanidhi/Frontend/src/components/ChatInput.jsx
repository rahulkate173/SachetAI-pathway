import { useState } from "react";
import { Mic, Send, MapPin, BarChart2 } from "lucide-react";

export default function ChatInput({ onSend, onVoice, isRecording }) 
 {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="border-t bg-white px-4 py-3 flex items-center gap-3">
      
      {/* Input box */}
      <div className="flex-1 flex items-center gap-2 bg-slate-50 border rounded-xl px-3 py-2">
        <input
          type="text"
          placeholder="Ask about live rescue status, evacuation routes, or alerts..."
          className="flex-1 bg-transparent outline-none text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <MapPin size={16} className="text-slate-400" />
        <BarChart2 size={16} className="text-slate-400" />
      </div>

      {/* Voice */}
      <button
       onClick={onVoice}
       className={`h-11 w-11 rounded-full flex items-center justify-center text-white
       ${isRecording ? "bg-red-500 animate-pulse" : "bg-orange-500 hover:bg-orange-600"}
       `}
       >
       <Mic size={18} />
      </button>


      {/* Send */}
      <button
        onClick={handleSend}
        className={`h-11 w-11 rounded-full flex items-center justify-center
          ${message.trim()
            ? "bg-slate-800 text-white"
            : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
      >
        <Send size={18} />
      </button>
    </div>
  );
}
