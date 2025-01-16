import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ListPage from "./Pages/ListPage";
import UserPage from "./Pages/UserPage";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/home"
          element={<HomePage/>}
        />
        <Route 
          path="/list" 
          element={<ListPage />} />
        <Route 
          path="/user" 
          element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
