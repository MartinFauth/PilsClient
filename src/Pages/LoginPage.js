import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import Cookies from "js-cookie";
//import axios from "axios";
//import api from './api';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [socket, setSocket] = useState(null); // Stocke la connexion WebSocket
  const [alertes, setAlertes] = useState([]); // Liste des alertes reçues
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Suivi de l'état d'authentification

 /* useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  

    // Envoyer les informations d'authentification via WebSocket
    sendMessage({
      type: "auth",
      data: { username, password },
    });
  };*/
  

  // useEffect(() => {
  //   console.log('app render');
  //   // Initialise la connexion WebSocket
  //   const ws = new WebSocket("ws://localhost:8001/ws"); // Remplace par l'URL de ton backend
  //   setSocket(ws);

  //   ws.onopen = () => {
  //     console.log("WebSocket connecté");
  //   };

  //   ws.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     console.log("Message reçu :", message);
  //     if (message.type === "alert") {
  //       // Ajouter l'alerte reçue
  //       setAlertes((prev) => [...prev, message.data]);
  //     } else if (message.type === "auth-response") {
  //       console.log(message.data);
  //       // Réponse d'authentification
  //       if (message.status === "success") {
  //         setIsAuthenticated(true);
  //         navigate("/home");
  //       } else {
  //         alert("Erreur d'authentification : " + message.message);

  //       }
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket déconnecté");
  //   };
  // }, [isAuthenticated, navigate]);


  const handleLogin = async () => {
    if (!username || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const result = await login(username, password);
    if (result.error) {
      console.error("Erreur de connexion :", result.error);
    }
  };
  


  // const sendMessage = (data) => {
  //     // Fonction pour envoyer un message via WebSocket
  //     console.log(socket.readyState);
  //     console.log(socket);
  //     if (socket && socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify(data));
  //       console.log(JSON.stringify(data));
        
        
  //     } else {
  //       console.error("WebSocket non connecté");
  //     }
  //   };


  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

const login = async (username, password) => {
  const apiUrl = 'http://127.0.0.1:5000/api/auth/login'; // Remplacez par l'URL de votre API

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // Permet d'envoyer/recevoir les cookies
    });

    if (response.ok) {
      const data = await response.json();

      console.log('Login successful:', data);
      Cookies.set("session_token",data.Session_id);
      Cookies.set("Is_Admin",data.isAdmin);
      Cookies.set("user",data.username);
      
      //sleep(10000);


      window.location.href = '/home'; // Redirige vers la page d'accueil
      return data;
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      alert('Login failed: ' + errorData.error);
      return { error: errorData.error };
    }
  } catch (error) {
    console.error('Error during login request:', error);
    alert('Network error. Please try again.');
    return { error: 'Network error' };
  }
};



function sleep(milliseconds) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {
      // Ne fait rien
  }
}


