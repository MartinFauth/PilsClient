import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();

  // États locaux
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attribute, setAttribute] = useState("camera_id"); // Attribut pour le filtre
  const [filterValue, setFilterValue] = useState(""); // Valeur du filtre

  // Vérifie l'authentification via le cookie
  useEffect(() => {
    const cookie = Cookies.get("session_token");
    if (!cookie) {
      navigate("/");
    } else {
      fetchAlertes();
    }
  }, [navigate]);

  // Fonction pour récupérer les alertes
  const fetchAlertes = async (attribute = null, value = null) => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://127.0.0.1:5001/api/alertes/all";
      if (attribute && value) {
        url = `http://127.0.0.1:5001/api/alertes?${attribute}=${value}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des alertes");
      }
      const data = await response.json();
      setAlertes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Gère le filtre des alertes
  const handleFilter = () => {
    if (filterValue) {
      fetchAlertes(attribute, filterValue);
    } else {
      fetchAlertes();
    }
  };

  // Réassigner une alerte avec un appel API
  const handleReassignerAlerte = async (id) => {
    const alerteToUpdate = alertes.find((alerte) => alerte.id === id);
    if (!alerteToUpdate) return;
  
    const convertToTimeFormat = (seconds) => {
      const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
      const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    };
  
    const formattedHeure = convertToTimeFormat(alerteToUpdate.heure);
  
    try {
      const response = await fetch(`http://127.0.0.1:5001/api/alertes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...alerteToUpdate,
          statut: "En cours",
          heure: formattedHeure, // Assurez-vous que l'heure est correctement formatée
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'alerte");
      }
  
      console.log(`Alerte ${id} réassignée avec succès`);
  
      setAlertes((prev) =>
        prev.map((alerte) =>
          alerte.id === id ? { ...alerte, statut: "en cours" } : alerte
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'alerte :", error);
    }
  };
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Liste des Alertes</h1>

      {/* Menu déroulant pour choisir l'attribut */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="attribute-select">Filtrer par : </label>
        <select
          id="attribute-select"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="id">Identifiant</option>

          <option value="camera_id">Camera ID</option>
          <option value="statut">Statut</option>
          <option value="date">Date</option>
        </select>
        <input
          type="text"
          placeholder="Entrez une valeur"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleFilter}>Filtrer</button>
      </div>

      {/* Affichage des alertes */}
      {loading ? (
        <p>Chargement des alertes...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Erreur : {error}</p>
      ) : alertes.length === 0 ? (
        <p>Aucune alerte trouvée.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {alertes.map((alerte) => (
            <div
              key={alerte.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Identifiant de l'alerte :</strong> {alerte.id}</p>
              <p><strong>Heure:</strong> {new Date(alerte.heure * 1000).toISOString().substr(11, 8)}</p>
              <p><strong>Date:</strong> {new Date(alerte.date).toLocaleString()}</p>
              <p><strong>Camera ID:</strong> {alerte.camera_id}</p>
              <p><strong>Statut:</strong> {alerte.statut}</p>
              <p><strong>Vidéo:</strong> {alerte.video || "N/A"}</p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleReassignerAlerte(alerte.id)}
              >
                Réassigner
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bouton retour */}
      <button
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
        onClick={() => navigate("/home")}
      >
        Retour à la page d'accueil
      </button>
    </div>
  );
};

export default ListPage;
