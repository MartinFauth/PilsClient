import React, { useState, useEffect } from "react";
import "./BottomBar.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const BottomBar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Met à jour l'état avec l'heure actuelle
    };
  
    const interval = setInterval(updateClock, 1000); // Met à jour toutes les secondes
    return () => clearInterval(interval); // Nettoie l'intervalle quand le composant est démonté
  }, []);

  const handleLogoutButtonClick = () => {
    // Supprime les cookies
    Cookies.remove("session_token", { path: '/' });
    Cookies.remove("Is_Admin", { path: '/' });
    Cookies.remove("user", { path: '/' });


    console.log('Cookies supprimés');

    // Navigate vers la page souhaitée
    navigate("/");
  };

  const handleUserButtonClick = () => {
    if (Cookies.get("Is_Admin") === "admin"){
    // Supprime les cookies
      navigate("/User");
    }
    //console.log('Cookies supprimés');

    // Navigate vers la page souhaitée
    
  };

  return (
    <div className="bottom-bar">
      <button className="button" onClick={handleLogoutButtonClick} >Logout</button>
      <button className="button" onClick={() => navigate("/list")}>Alerte List</button>
      {Cookies.get("Is_Admin") === "admin" && (
        <button className="button" onClick={handleUserButtonClick}>User menu</button>
      )}
      <div className="time">{currentTime}</div>
    </div>
  );
};

export default BottomBar;