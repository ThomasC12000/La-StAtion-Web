"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const DropdownButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleCalendar = () => {
    router.push("/calendar");
  };

  const handleMessages = () => {
    window.open("https://chat.whatsapp.com/CL8szICF96yKgqsZAizbpR", "_blank");
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end bg-dark">
        <li>
          <button
            className="dropdown-item text-light"
            type="button"
            onClick={handleHome}
          >
            <i
              className="fa fa-home me-2"
              aria-hidden="true"
              style={{ marginLeft: "-2px" }}
            ></i>
            Accueil
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-light"
            type="button"
            onClick={handleCalendar}
          >
            <i className="fa fa-calendar me-2" aria-hidden="true"></i>
            Calendrier
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-light"
            type="button"
            onClick={handleMessages}
          >
            <i
              className="fa fa-comment me-2"
              aria-hidden="true"
              style={{ marginLeft: "-1px" }}
            ></i>
            Messagerie
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-light"
            type="button"
            onClick={handleDashboard}
          >
            <i
              className="fa fa-cog me-2"
              aria-hidden="true"
              style={{ marginLeft: "-1px" }}
            ></i>
            Profil utilisateur
          </button>
        </li>
        <li className="dropdown-divider bg-light"></li>
        <li>
          <button
            className="dropdown-item text-light"
            type="button"
            onClick={handleSignOut}
          >
            <i
              className="fas fa-sign-out-alt me-2"
              style={{ color: "#cc232b" }}
            ></i>
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownButton;
