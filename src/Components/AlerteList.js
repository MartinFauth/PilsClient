import React from "react";
import "./AlerteList.css";

const AlerteList = ({ alertes, onSelectAlerte }) => {
  return (
    <div className="alerte-list">
      {alertes.map((alerte) => (
        <div
          key={alerte.id}
          className="alerte-item"
          onClick={() => onSelectAlerte(alerte)}
        >
          {/* En-tête de l'alerte */}
          <div className="header">
            <div className="id">ID: {alerte.id}</div>
            <div
              className={`statut ${
                alerte.statut.toLowerCase() === "en cours" ? "en-cours" : "classee"
              }`}
            >
              {alerte.statut}
            </div>
          </div>

          {/* Détails de l'alerte */}
          <div className="details">
            <p>
              <span>Date :</span> {new Date(alerte.date).toLocaleDateString()}
            </p>
            <p>
              <span>Heure :</span> {alerte.heure}
            </p>
            <p>
              <span>Caméra :</span> {alerte.camera_id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlerteList;
