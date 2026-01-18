// // // export async function sendTextMessage(message) {
// // //   return fetch("/api/chat", {
// // //     method: "POST",
// // //     headers: { "Content-Type": "application/json" },
// // //     body: JSON.stringify({ message }),
// // //   });
// // // }

// // // export async function sendVoiceMessage(audioBlob) {
// // //   const formData = new FormData();
// // //   formData.append("audio", audioBlob);

// // //   // placeholder endpoint
// // //   const response = await fetch("/api/voice-query", {
// // //     method: "POST",
// // //     body: formData,
// // //   });

// // //   return response.json();
// // // }

// // // //FOR REFERENCE BACKEND INTEGRATION USING FASTAPI , later delete. 
// // // // chatApi.js
// // // // This file will be owned by backend integration

// // // //export async function sendTextMessage(text) {
// // //   // POST /chat/query
// // //   // return response.json()
// // // //}

// // // //export async function sendVoiceMessage(audioBlob) {
// // //   // POST /chat/voice
// // // //}
// // // import { api } from "./base";

// // // export const askDisasterQuery = async (question) => {
// // //   const response = await api.post("/api/query", {
// // //     question,
// // //   });
// // //   return response.data;
// // // };



// // import { API_BASE_URL } from "./base";

// // export async function sendChatMessage(message) {
// //   const response = await fetch(`${API_BASE_URL}/chat`, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ query: message }),
// //   });

// //   if (!response.ok) {
// //     throw new Error("Chat API failed");
// //   }

// //   return response.json();
// // }

// // export async function sendVoiceMessage(audioBlob) {
// //   const formData = new FormData();
// //   formData.append("audio", audioBlob);

// //   const response = await fetch(`${API_BASE_URL}/voice`, {
// //     method: "POST",
// //     body: formData,
// //   });

// //   if (!response.ok) {
// //     throw new Error("Voice API failed");
// //   }

// //   return response.json();
// // }



// import { sendChatMessage } from "../api/chatApi";
// import { useState } from "react";

// export default function ChatInput({ onNewMessage }) {
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     setLoading(true);

//     try {
//       const res = await sendChatMessage(input);

//       onNewMessage({
//         role: "assistant",
//         content: res.answer || res.response || JSON.stringify(res),
//       });
//     } catch (err) {
//       console.error("Chat API error:", err);
//     } finally {
//       setLoading(false);
//     }

//     setInput("");
//   };

//   return (
//     <button onClick={handleSend} disabled={loading}>
//       Send
//     </button>
//   );
// }


// src/api/chatApi.js

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

/**
 * Send text query to FastAPI backend
 * Backend endpoint: POST /api/query
 * Payload shape: { question: string }
 */
export async function sendChatMessage(message) {
  const response = await fetch(`${API_BASE_URL}/api/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: message,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Chat API failed: ${errorText}`);
  }

  return response.json();
}

/**
 * (Optional) Voice query support
 * Backend endpoint example: POST /api/voice-query
 */
export async function sendVoiceMessage(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const response = await fetch(`${API_BASE_URL}/api/voice-query`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Voice API failed: ${errorText}`);
  }

  return response.json();
}
