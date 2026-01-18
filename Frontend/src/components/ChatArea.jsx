import { useState } from "react";
import ChatInput from "./ChatInput";
import { startRecording, stopRecording } from "../api/voiceRecorder";
import { sendChatMessage } from "../api/chatApi";


export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  

 const handleSend = async (text) => {
  if (!text.trim()) return;

  // 1. Show user message immediately
  setMessages((prev) => [
    ...prev,
    { role: "user", content: text },
  ]);

  try {
    // 2. Call backend
    const response = await sendChatMessage(text);

    // 3. Show assistant response
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response.answer || "No answer returned",
      },
    ]);
  } catch (err) {
    console.error("Chat API error:", err);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Backend error. Please try again.",
      },
    ]);
  }
};


  // 2. Call backend (to be implemented by backend team)
  // const response = await sendTextMessage(text);

  // 3. Backend will return assistant response
  // setMessages((prev) => [
  //   ...prev,
  //   { role: "assistant", content: response.answer },
  // ]);



  const handleVoice = async () => {
    if (!isRecording) {
      setIsRecording(true);
      await startRecording((audioBlob) => {
        console.log("Recorded audio:", audioBlob);
      });
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  return (
     <div className="flex flex-col min-h-full bg-white">
      
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">

        <h1 className="text-3xl font-semibold text-slate-900">
          SachetAI
        </h1>
        <p className="text-lg text-slate-600 mt-1">
          Live NDRF Disaster Response Assistant
        </p>
      </div>

      
      <div className="flex-1">
        
        {/* Welcome Panel */}
        {messages.length === 0 && (
          <div className="p-6">
            <div className="max-w-xl bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Welcome to SachetAI
              </h2>

              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li>• Ask about live rescue operations and status updates</li>
                <li>• Get real-time evacuation routes and shelter information</li>
                <li>• Access NDRF and Maharashtra disaster alerts</li>
              </ul>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-semibold text-orange-700 mb-1">
                  Actionable Instructions
                </p>
                <ol className="text-sm text-slate-700 space-y-1">
                  <li>1. Use voice commands for hands-free operation</li>
                  <li>2. Ask location-specific questions for faster response</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[70%] px-4 py-3 rounded-xl text-sm
                  ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white ml-auto"
                      : "bg-slate-100 text-slate-800"
                  }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-slate-200">
        <ChatInput
          onSend={handleSend}
         onVoice={handleVoice}
         isRecording={isRecording}
        />
      </div>

    </div>
  );
}
