import React from "react";
import "./TopRight.css";

const TopRight = ({ alerte, onClasser, onReassigner , onFP}) => {
  if (!alerte) {
    return <div className="top-right">Aucune alerte sélectionnée.</div>;
  }

  return (
    <div className="top-right">
      <h3>Détails de l'alerte</h3>
      <p>Caméra : {alerte.camera_id}</p>
      <p>Date : {alerte.date}</p>
      <p>Heure : {alerte.heure}</p>
      <p>Fausse alerte : {alerte.fauxPositif ? "non" : "oui"}</p>
      <button onClick={() => onClasser(alerte.id)}>Classer</button>
      <button onClick={() => onReassigner(alerte.id)}>Réassigner</button>
      <button onClick={() => onFP(alerte.id)}>Fausse alerte</button>
    </div>
  );
};

export default TopRight;
