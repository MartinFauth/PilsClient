import React from "react";
import AlerteList from "../AlerteList"; // Import de la liste des alertes
import "./BottomRight.css";

const BottomRight = ({ alertes, onSelectAlerte }) => {
  return (
    <div className="bottom-right">
      <h3>Alertes en cours</h3>
      <AlerteList
        alertes={alertes.filter((alerte) => alerte.statut === "En cours")} // Filtre des alertes en cours
        onSelectAlerte={onSelectAlerte}
      />
    </div>
  );
};

export default BottomRight;
