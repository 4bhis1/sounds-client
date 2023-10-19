import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4001"); // Replace with your server URL

function App() {
  const [clientId, updateClientId] = useState();
  const [start, updateStart] = useState();
  const [chunk, updateChunk] = useState();

  console.log(">>> render");

  useEffect(() => {
    socket.on("clientId", (clientId) => {
      console.log("\n@@@  file: Demo.js:14  clientId:", clientId);
      updateClientId(clientId);
    });
  }, []);

  useEffect(() => {
    socket.on("newChunk", (data) => {
      setTimeout(() => {
        console.log(">>> state trrigered after 2 seconds", data);
        updateChunk(data);
      }, 2000);
    });
  }, []);
  
  useEffect(() => {
    if (chunk !== undefined) {
      console.log(">> making a handshake call");
      socket.emit("handshake", { clientId, chunkNumber: chunk });
    }
  }, [chunk]);

  return (
    <div>
      <div>{clientId}</div>
      <div>--></div>
      {chunk}

      <div
        onClick={() => {
          socket.emit("startCall", "start");
        }}
      >
        Start
      </div>
      <div
        onClick={() => {
          socket.emit("startCall", "end");
        }}
      >
        Stop
      </div>
    </div>
  );
}

export default App;
