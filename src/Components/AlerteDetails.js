import React from "react";
import "./AlerteDetails.css";

const AlerteDetails = ({ alerte, onClasser, onReassigner }) => {
  return (
    <div className="alerte-details">
      <h3>Détails de l'alerte</h3>
      <p><strong>Caméra :</strong> {alerte.camera_id}</p>
      <p><strong>Date :</strong> {alerte.date}</p>
      <p><strong>Heure :</strong> {alerte.heure}</p>
      <p><strong>Statut :</strong> {alerte.statut}</p>
      <button onClick={() => onClasser(alerte.id)} className="classer-btn">Classer</button>
      <button onClick={() => onReassigner(alerte.id)} className="reassigner-btn">Réassigner</button>
    </div>
  );
};

export default AlerteDetails;
