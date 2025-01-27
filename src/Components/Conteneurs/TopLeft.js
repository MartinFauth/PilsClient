import React, { useState } from "react";
import "./TopLeft.css";

const TopLeft = ({ video }) => {
  const [error, setError] = useState(false);

  // Chemin du serveur pour les vidéos
  const videoPath = video ? `http://localhost:3000/output_videos/alerts/${video}` : null;
  console.log(videoPath);

  return (
    <div className="top-left">
      {video ? (
        !error ? (
          <video
            src={videoPath}
            controls
            width="640"
            height="360"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
            onError={() => setError(true)} // Met à jour l'état en cas d'erreur
          />
        ) : (
          <p>Impossible de charger la vidéo sélectionnée.</p>
        )
      ) : (
        <p>Aucune alerte sélectionnée.</p>
      )}
    </div>
  );
};

export default TopLeft;
