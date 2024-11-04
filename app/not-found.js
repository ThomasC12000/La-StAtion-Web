"use client";

import React from "react";
import Link from "next/link";
import components from "./components";

import "./globals.css";

const NotFound = () => {
  return (
    <>
      <title>404 - Page Not Found</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div style={{ textAlign: "center" }}>
            <div className="error mx-auto" data-text="404">
              404
            </div>
            <p className="lead text-gray-800 mb-5">Page Not Found</p>
            <p className="text-gray-500 mb-0">
              Oups, un petit souci est survenu...
            </p>
            <Link href="/" style={{ textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default NotFound;
