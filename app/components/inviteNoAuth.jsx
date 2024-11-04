import React from "react";
import components from "../components";

const inviteNoAuth = () => {
  return (
    <>
      <title>La StAtion | Connectez-vous</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div style={{ textAlign: "center" }}>
            <h1 className="h4 text-gray-900 mb-4">Bienvenue</h1>
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <div>
              <a
                className="btn btn-primary btn-user m-2"
                href="/api/auth/signin"
              >
                Se connecter
              </a>
              <a
                className="btn btn-secondary btn-user m-2"
                href="/api/auth/newUser"
              >
                S&apos;inscrire
              </a>
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default inviteNoAuth;
