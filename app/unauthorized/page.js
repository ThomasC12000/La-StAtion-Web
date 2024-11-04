"use client";

import React from "react";
import components from "../components";

const Unauthorized = () => {
  return (
    <>
      <title>La StAtion | Non autorisé</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="mb-4">Non autorisé !</h1>
            <p className="lead text-gray-800 mb-5">
              Vous n&apos;avez pas les permissions nécessaires pour accéder à
              cette page.
            </p>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default Unauthorized;
