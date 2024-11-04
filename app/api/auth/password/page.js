"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import components from "../../../components";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(
        () => {
          setMessage({ text: "", type: "" });
        },
        message.type === "success" ? 3000 : 5000
      ); // Durée différente selon le type de message
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/password/resetPasswordToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de réinitialisation !");
      }

      setMessage({
        text: data.message,
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "./signin";
      }, 3000);
    } catch (error) {
      setMessage({
        text:
          error.message ||
          "Une erreur est survenue. Veuillez réessayer plus tard.",
        type: "danger",
      });
    }
  };

  return (
    <>
      <title>Réinitialisation du mot de passe</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <nav className="navbar fixed-top navbar-dark bg-dark shadow">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <a className="navbar-brand" href="/">
                <i
                  className="fas fa-lock"
                  style={{ fontSize: "43.5px", color: "white" }}
                ></i>
              </a>
              <div className="d-flex align-items-center">
                <span className="text-white d-none d-lg-block">
                  Espace Co-Worker
                </span>
                <div className="topbar-divider d-none d-lg-block"></div>
                <Link href="/api/auth/newUser" passHref>
                  <button className="btn btn-outline-light me-2">
                    S&apos;inscrire
                  </button>
                </Link>
                <Link href="/api/auth/signin" passHref>
                  <button className="btn btn-outline-light">
                    Se connecter
                  </button>
                </Link>
              </div>
            </div>
          </nav>
          <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg p-3 rounded-5">
                  <h1 className="h4 text-center text-gray-900 mb-4">
                    Mot de passe oublié ?
                  </h1>
                  <div className="text-center">
                    <p className="mb-4">
                      Pas d&apos;inquiétude, on s&apos;occupe de tout !
                    </p>
                  </div>
                  {message.text && (
                    <div className={`alert alert-${message.type}`}>
                      {message.text}
                    </div>
                  )}
                  <form className="user" onSubmit={handleSubmit}>
                    <div
                      className="input-group mb-3"
                      style={{ height: "45px" }}
                    >
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-email"
                        style={{
                          borderTopLeftRadius: "50px",
                          borderBottomLeftRadius: "50px",
                          height: "100%",
                        }}
                      >
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail"
                        aria-describedby="inputGroup-sizing-email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                        required
                      />
                    </div>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block rounded-5"
                      >
                        Envoyer le lien de réinitialisation
                      </button>
                    </center>
                    <hr />
                  </form>
                  <div className="text-center">
                    <Link
                      className="small"
                      href="./signin"
                      style={{ textDecoration: "none" }}
                    >
                      Vous avez déjà un compte ? Connectez-vous !
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default ResetPassword;
