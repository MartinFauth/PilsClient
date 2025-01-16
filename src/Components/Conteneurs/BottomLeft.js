import React from "react";
import AlerteList from "../AlerteList"; // Import de la liste des alertes
import "./BottomLeft.css";

const BottomLeft = ({ alertes, onSelectAlerte }) => {
  return (
    <div className="bottom-left">
      <h3>Alertes Classées</h3>
      <AlerteList
        alertes={alertes.filter((alerte) => alerte.statut === "Classee")} // Filtre des alertes classées
        onSelectAlerte={onSelectAlerte}
      />
    </div>
  );
};

export default BottomLeft;
