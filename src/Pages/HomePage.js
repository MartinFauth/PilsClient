import React, { useEffect, useState, useRef } from "react";
import "../Pages/HomePage.css";
import MainContainer from "../Components/Conteneurs/MainContainer"; // Import du MainContainer
import BottomBar from "../Components/BottomBar"; // Import du BottomBar
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [alertes, setAlertes] = useState([]); // Liste des alertes dynamiques
  const [selectedAlerte, setSelectedAlerte] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification de la présence d'un cookie session_token
    const cookie = Cookies.get("session_token");
    if (!cookie) {
      navigate("/"); // Si le cookie n'est pas présent, redirection vers la page de connexion
      return;
    }else{


    }
    

    // Récupération des alertes via l'API
    const fetchAlertes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/alertes?statut=En cours"); // Récupère les alertes avec websocket = 0
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des alertes");
        }
        const data = await response.json();

        // Transformation des données pour affichage correct
        const transformedData = data.map((alerte) => ({
          ...alerte,
          statut: alerte.statut.charAt(0).toUpperCase() + alerte.statut.slice(1), // Capitalise "statut"
          heure: new Date(alerte.heure * 1000).toISOString().substr(11, 8), // Convertit "heure" en HH:MM:SS
        }));

        console.log("Données transformées pour affichage :", transformedData); // Debug des données transformées
        setAlertes(transformedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des alertes :", error);
      }
    };

    fetchAlertes();
  }, [navigate]);

  // Sélectionner une alerte
  const handleSelectAlerte = (alerte) => setSelectedAlerte(alerte);

  // Classer une alerte (local uniquement, pas de mise à jour API dans cette version)
  const handleClasserAlerte = async (id) => {
    console.log("lkaa");
    console.log(Cookies.get("user"))
    const alerteToUpdate = alertes.find((alerte) => alerte.id === id);
    if (!alerteToUpdate) return;
    

    try {
      const response = await fetch(`http://127.0.0.1:5001/api/alertes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...alerteToUpdate,
          updatedBy : Cookies.get("user"),
          statut: "Classee"
          

           // Mise à jour du statut
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'alerte");
      }

      console.log(`Alerte ${id} mise à jour avec succès`);

      setAlertes((prev) =>
        prev.map((alerte) =>
          alerte.id === id ? { ...alerte, statut: "Classee" } : alerte
        )
      );
      setSelectedAlerte(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'alerte :", error);
    }
  };


  // Réassigner une alerte (local uniquement, pas de mise à jour API dans cette version)
  const handleReassignerAlerte = async (id) => {
    const alerteToUpdate = alertes.find((alerte) => alerte.id === id);
    if (!alerteToUpdate) return;

    try {
      const response = await fetch(`http://127.0.0.1:5001/api/alertes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...alerteToUpdate,
          statut: "En cours", // Mise à jour du statut
          updatedBy : Cookies.get("user"),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'alerte");
      }

      console.log(`Alerte ${id} réassignée avec succès`);

      setAlertes((prev) =>
        prev.map((alerte) =>
          alerte.id === id ? { ...alerte, statut: "En cours" } : alerte
        )
      );
      setSelectedAlerte(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'alerte :", error);
    }
  };

  return (
    <div className="homepage-container">
      {/* MainContainer contient les 4 conteneurs */}
      <MainContainer
        alertes={alertes}
        selectedAlerte={selectedAlerte}
        onSelectAlerte={handleSelectAlerte}
        onClasser={handleClasserAlerte}
        onReassigner={handleReassignerAlerte}
      />

      {/* Bandeau fixe */}
      <BottomBar />
    </div>
  );
};

export default HomePage;
