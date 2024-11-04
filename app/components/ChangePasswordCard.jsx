"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const ChangePasswordCard = () => {
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("/api/updateInfo/updateUserPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Mot de passe changé avec succès ! Vous allez être déconnecté.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        signOut({ callbackUrl: "/api/auth/signin" });
      } else {
        alert(data.message || "Erreur lors du changement de mot de passe.");
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      alert("Une erreur est survenue lors du changement de mot de passe.");
    }
  };

  const inputStyle = {
    borderRadius: "50px",
    height: "65%",
  };

  return (
    <div className="col-lg-4 mb-4">
      <div className="card h-100 shadow-lg p-4 rounded-5 d-flex flex-column">
        <div className="p-4 d-flex flex-column justify-content-center">
          <h5 className="card-title text-center mb-4">
            Changer le mot de passe
          </h5>
          <div className="mb-3">
            <label className="labels mb-1">Mot de passe actuel :</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe actuel"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div className="mb-3">
            <label className="labels mb-1">Nouveau mot de passe :</label>
            <input
              type="password"
              className="form-control"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div className="mb-3">
            <label className="labels mb-1">
              Confirmer le nouveau mot de passe :
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div className="mt-3 text-center">
            <button
              className="btn btn-primary profile-button rounded-5"
              type="button"
              onClick={handleChangePassword}
            >
              Changer le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
