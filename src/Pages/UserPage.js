import React, { useEffect, useState } from "react";
import "./UserPage.css"; // Assurez-vous que ce fichier existe
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    adresse: "",
    password: "",
    confirmPassword: "",
    droits: false,
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/users");
      const data = await response.json();
      console.log(data);
      setUsers(data.users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleCreateUser = async () => {
    // Vérifier que les mots de passe correspondent
    if (newUser.password !== newUser.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.adresse, // Remplacer 'adresse' par 'email'
          password: newUser.password,
          is_admin: newUser.droits, // Remplacer 'droits' par 'is_admin'
        }),
      });
  
      if (response.ok) {
        // Réinitialiser les champs du formulaire
        setNewUser({
          username: "",
          adresse: "", // Réinitialiser l'email
          password: "",
          confirmPassword: "",
          droits: false,
        });
        fetchUsers(); // Recharger les utilisateurs
      } else {
        console.error("Erreur lors de la création de l'utilisateur:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
    }
  };
  

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/auth/delete-user/${username}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
  };

  const handleUpdateUser = async () => {
    const updatedData = {
      ...(editUser.new_username && { new_username: editUser.new_username }),
      ...(editUser.new_email && { new_email: editUser.new_email }),
      ...(editUser.new_password && { new_password: editUser.new_password }),
      // Convertir new_role en entier (0 ou 1)
      new_role: editUser.new_role ? 1 : 0,
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/auth/update-user/${editUser.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        fetchUsers();
        setEditUser(null);
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la mise à jour de l'utilisateur:", errorData);
      }
    } catch (error) {
      console.error("Erreur réseau lors de la mise à jour de l'utilisateur:", error);
    }
  };
  
  
  

  return (
    <div className="user-page">
      <h1>Gestion des utilisateurs</h1>

      {/* Liste des utilisateurs */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>adresse</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.adresse}</td>
              <td>{user.droits}</td>
              <td>
                <button
                  onClick={() => setEditUser(user)}
                  className="edit-button"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulaire de création d'utilisateur */}
      <div className="user-form">
        <h2>Ajouter un utilisateur</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="adresse"
          placeholder="adresse"
          value={newUser.adresse}
          onChange={(e) => setNewUser({ ...newUser, adresse: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={newUser.confirmPassword}
          onChange={(e) =>
            setNewUser({ ...newUser, confirmPassword: e.target.value })
          }
        />
        <label>
          Admin ?
          <input
            type="checkbox"
            checked={newUser.droits}
            onChange={(e) =>
              setNewUser({ ...newUser, droits: e.target.checked })
            }
          />
        </label>
        <button onClick={handleCreateUser} className="create-button">
          Ajouter
        </button>
      </div>

      {/* Formulaire de mise à jour d'utilisateur */}
{editUser && (
  <div className="user-form">
    <h2>Modifier l'utilisateur</h2>
    <input
      type="text"
      placeholder="Nom d'utilisateur"
      defaultValue={editUser.username}
      onChange={(e) => setEditUser({ ...editUser, new_username: e.target.value })}
    />
    <input
      type="email"
      placeholder="Email"
      defaultValue={editUser.email}
      onChange={(e) => setEditUser({ ...editUser, new_email: e.target.value })}
    />
    <input
      type="password"
      placeholder="Nouveau mot de passe"
      onChange={(e) => setEditUser({ ...editUser, new_password: e.target.value })}
    />
    <label>
      Admin ?
      <input
        type="checkbox"
        checked={editUser.is_admin}
        onChange={(e) => setEditUser({ ...editUser, new_role: e.target.checked })}
      />
    </label>
    <button onClick={handleUpdateUser} className="update-button">
      Mettre à jour
    </button>
    <button onClick={() => setEditUser(null)} className="cancel-button">
      Annuler
    </button>
  </div>
)}
            <button className="button" onClick={() => navigate("/home")}>Retour à la page d'accueil</button>

    </div>
  );
};

export default UserPage;
