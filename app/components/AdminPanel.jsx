"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/updateInfo/getAllData", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erreur de récupération des données");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors de la récupération des données");
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch("/api/updateInfo/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }

      setUsers(users.filter((user) => user._id !== userId));
      // Vérification si l'utilisateur supprimé est l'utilisateur connecté
      if (session?.user?.id === userId) {
        await signOut({ redirect: false }); // Déconnexion sans redirection immédiate
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setError("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch("/api/updateInfo/adminUpdateUserInfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: editingUser,
          firstName,
          lastName,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }

      setUsers(
        users.map((user) =>
          user._id === editingUser
            ? { ...user, firstName, lastName, email }
            : user
        )
      );
      setEditingUser(null);
      setFirstName("");
      setLastName("");
      setEmail("");

      signOut({ redirect: false });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      setError("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch("/api/updateInfo/updateUserRole", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la mise à jour du rôle de l'utilisateur"
        );
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du rôle de l'utilisateur:",
        error
      );
      setError("Erreur lors de la mise à jour du rôle de l'utilisateur");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className={`container mt-2 ${editingUser ? "editing" : ""}`}>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un utilisateur..."
              onChange={handleSearch}
            />
          </div>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="text-center align-middle">ID</th>
                <th className="text-center align-middle">Nom</th>
                <th className="text-center align-middle">Prénom</th>
                <th className="text-center align-middle">Email</th>
                <th className="text-center align-middle">Image de Profil</th>
                <th className="text-center align-middle">Rôle</th>
                <th className="text-center align-middle">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="text-center align-middle">{user._id}</td>
                  <td className="text-center align-middle">{user.lastName}</td>
                  <td className="text-center align-middle">{user.firstName}</td>
                  <td className="text-center align-middle">{user.email}</td>
                  <td className="text-center align-middle">
                    {user.profileImage && (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        width="50"
                        height="50"
                        className="rounded-circle"
                      />
                    )}
                  </td>
                  <td className="text-center align-middle">
                    <select
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      value={user.role}
                      className="form-select"
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingUser && (
            <div className="card p-4 mt-4">
              <h3 className="card-title text-center">
                Modifier l&apos;utilisateur
              </h3>
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleSaveUser}
                >
                  Sauvegarder
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
          <br />
        </>
      )}
    </div>
  );
}
