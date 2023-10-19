import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4001"); // Replace with your server URL

function AudioPlayer2() {
  const [mp3Chunks, setMp3Chunks] = useState([]);
  const [audioSource, setAudioSource] = useState(null);

  useEffect(() => {
    socket.on("mp3-chunk", (chunk) => {
      console.log("\n@@@  file: AudioPlayer2.js:14  chunk:", chunk);

      setMp3Chunks((prevChunks) => [...prevChunks, chunk]);
    });
  }, []);

  // Once you have received all chunks, you can reassemble them into an MP3 file.
  // Here's how to create an audio source from the reassembled chunks.

  useEffect(() => {
    if (mp3Chunks.length > 0) {
      const audioBlob = new Blob(mp3Chunks, { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSource(audioUrl);
    }
  }, [mp3Chunks]);

  return (
    <div>
      Nice guys
      {audioSource && (
        <audio controls>
          <source src={audioSource} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default AudioPlayer2;
