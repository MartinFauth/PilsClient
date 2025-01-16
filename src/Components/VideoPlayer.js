import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ video }) => {
  return (
    <div className="video-player">
      <video controls src={video} />
    </div>
  );
};

export default VideoPlayer;
