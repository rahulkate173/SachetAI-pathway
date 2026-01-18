let mediaRecorder;
let audioChunks = [];

export async function startRecording(onStop) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    onStop(audioBlob);
  };

  mediaRecorder.start();
}

export function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
}

// return {
//   audioBlob,
//   mimeType: "audio/webm",
//   duration,
// };
