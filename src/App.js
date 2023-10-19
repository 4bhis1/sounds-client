import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import AudioPlayer from "./upload/AudioPlayer";
import FileUpload from "./upload/FileUpload";
import io from "socket.io-client";
import { useEffect } from "react";
import AudioPlayer2 from "./AudioPlayer2";

const socket = io("http://localhost:4001"); // Replace with your server URL

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/send" />} />
      <Route path="/receive" element={<AudioPlayer />} />
      <Route path="/receive2" element={<AudioPlayer2 />} />
      <Route path="/send" element={<FileUpload />} />
    </>
  )
);

function App() {
  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.on('chat message', (msg) => {
  //     // setMessages([...messages, msg]);
  //   });
  // }, [messages]);

  socket.on("sms", (doc) => {
    console.log(">>> dopc", doc);
  });

  // const sendMessage = () => {
  //   socket.emit('chat message', message);
  //   // setMessage('');
  // };

  return <RouterProvider router={router} />;
}

export default App;
