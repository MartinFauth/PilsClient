import React from "react";
import "./TopLeft.css";

const TopLeft = ({ video }) => {
  // Chemin du serveur pour les vidéos
  const videoPath = video ? `http://127.0.0.1:5001/videos/${video}` : null;

  return (
    <div className="top-left">
      {video ? (
        <video src={videoPath} controls />
      ) : (
        <p>Aucune alerte sélectionnée.</p>
      )}
    </div>
  );
};

export default TopLeft;
