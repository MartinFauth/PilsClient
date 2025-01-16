import React from "react";
import TopLeft from "../Conteneurs/TopLeft";
import TopRight from "../Conteneurs/TopRight";
import BottomLeft from "../Conteneurs/BottomLeft";
import BottomRight from "../Conteneurs/BottomRight";
import "../Conteneurs/MainContainer.css";

const MainContainer = ({ alertes, selectedAlerte, onSelectAlerte, onClasser, onReassigner }) => {

  console.log("Alertes reçues dans MainContainer :", alertes);

  return (
    <div className="main-container">
      {/* Section TopLeft : Vidéo */}
      <TopLeft video={selectedAlerte?.video} />
      
      {/* Section TopRight : Détails de l'alerte */}
      <TopRight 
        alerte={selectedAlerte} 
        onClasser={onClasser} 
        onReassigner={onReassigner} 
      />

      {/* Section BottomLeft : Alertes classées */}
      <BottomLeft 
        alertes={alertes.filter((a) => a.statut === "Classee")} 
        onSelectAlerte={onSelectAlerte} 
      />
      
      {/* Section BottomRight : Alertes en cours */}
      <BottomRight 
        alertes={alertes.filter((a) => a.statut === "En cours")} 
        onSelectAlerte={onSelectAlerte} 
      />
    </div>
  );
};

export default MainContainer;
