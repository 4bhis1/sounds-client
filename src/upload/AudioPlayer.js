import React, { useEffect, useRef, useState } from "react";

function AudioPlayer() {
 
  return (
    <audio controls>
      <source src="http://localhost:4001/stream-audio" type="audio/mpeg" />
    </audio>
  );
}

export default AudioPlayer;

/* 
BIG PLAN

upload the music,
stream to all the devices,

*/
