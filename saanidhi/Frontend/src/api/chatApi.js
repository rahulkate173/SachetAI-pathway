export async function sendTextMessage(message) {
  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
}

export async function sendVoiceMessage(audioBlob) {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  // placeholder endpoint
  const response = await fetch("/api/voice-query", {
    method: "POST",
    body: formData,
  });

  return response.json();
}

//FOR REFERENCE BACKEND INTEGRATION USING FASTAPI , later delete. 
// chatApi.js
// This file will be owned by backend integration

//export async function sendTextMessage(text) {
  // POST /chat/query
  // return response.json()
//}

//export async function sendVoiceMessage(audioBlob) {
  // POST /chat/voice
//}

