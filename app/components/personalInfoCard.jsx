"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import components from "../components";

export default function PersonalInfoCard() {
  const { data: session, update } = useSession();
  const [firstName, setFirstName] = useState(session?.user?.firstName || "");
  const [lastName, setLastName] = useState(session?.user?.lastName || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
    }
  }, [session]);

  const fullName = `${firstName} ${lastName}`;

  const handleSave = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch("/api/updateInfo/updateUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Informations sauvegardées avec succès !");
        await update({
          ...session,
          user: {
            ...session.user,
            firstName,
            lastName,
            email,
            name: fullName,
          },
        });
      } else {
        alert("Échec de la sauvegarde des informations.");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des informations:", error);
      alert("Une erreur est survenue lors de la sauvegarde des informations.");
    }
  };

  const inputStyle = {
    borderRadius: "50px",
    height: "65%",
  };

  return (
    <div className="col-lg-5 mb-4">
      <div className="card h-100 shadow-lg p-4 rounded-5 d-flex flex-column">
        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
          <h5 className="card-title text-center mb-4">
            Informations personnelles
          </h5>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="labels mb-1">Nom d&apos;utilisateur :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nom d'utilisateur"
                value={fullName}
                readOnly
                disabled
                style={inputStyle}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-2 mb-md-0">
              <label className="labels mb-1">Prénom :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div className="col-md-6">
              <label className="labels mb-1">Nom :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12">
              <label className="labels mb-1">Adresse e-mail :</label>
              <input
                type="email"
                className="form-control"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div className="mt-2 d-flex flex-column flex-md-row justify-content-center align-items-center">
            <button
              className="btn btn-primary profile-button rounded-5 mb-2 mb-md-0 me-md-2"
              type="button"
              onClick={handleSave}
            >
              Enregistrer
            </button>
            <components.DeleteAccountButton className="btn btn-danger rounded-5 mb-2 mb-md-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
