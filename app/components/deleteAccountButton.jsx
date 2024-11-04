"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const DeleteAccountButton = () => {
  const { data: session } = useSession();
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        const response = await fetch("/api/updateInfo/deleteUser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session.user.id }),
        });

        if (!response.ok) {
          throw new Error("Erreur de suppression du compte");
        }

        const data = await response.json();

        if (data.success) {
          alert("Compte supprimé avec succès !");
          signOut({ callbackUrl: "/" }); // Déconnexion automatique après suppression du compte
        } else {
          alert(data.message || "Erreur lors de la suppression du compte.");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
        setError("Erreur lors de la suppression du compte.");
      }
    }
  };
  return (
    <button
      className="btn btn-danger profile-button rounded-5 ms-2"
      type="button"
      onClick={handleDeleteAccount}
    >
      Supprimer le compte
    </button>
  );
};

export default DeleteAccountButton;
