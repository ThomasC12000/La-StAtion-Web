"use client";

import React, { useState } from "react";
import { generateRandomCode } from "../../utils/secretCode";

const CodeGenerator = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleGenerateCode = async () => {
    try {
      const newCode = await generateRandomCode();
      setCode(newCode);
      setMessage({ text: "", type: "" });
    } catch (error) {
      setMessage({
        text: "Erreur lors de la génération du code.",
        type: "danger",
      });
      console.error("Erreur lors de la génération du code:", error);
    }
  };

  const handleSendCode = async () => {
    if (email !== confirmEmail) {
      setMessage({
        text: "Les adresses email ne correspondent pas.",
        type: "danger",
      });
      return;
    }
    if (!email || !confirmEmail) {
      setMessage({
        text: "Veuillez remplir les deux champs d'email.",
        type: "danger",
      });
      return;
    }

    try {
      const response = await fetch("/api/secretCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          text: `Le code ${code} a été envoyé à ${email}.`,
          type: "success",
        });
      } else {
        setMessage({
          text: result.message || "Erreur lors de l'envoi du code.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du code", error);
      setMessage({
        text: "Une erreur est survenue lors de l'envoi du code.",
        type: "danger",
      });
    }
  };

  return (
    <>
      <title>La StAtion | Générateur de Code</title>
      <div className="d-flex flex-column">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-2">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg p-3 rounded-5">
                  <h1 className="h4 text-center text-gray-900 mb-4">
                    Générateur de code
                  </h1>
                  <div className="text-center mb-2">
                    <button
                      onClick={handleGenerateCode}
                      className="btn btn-primary mb-2"
                    >
                      Générer un nouveau code
                    </button>
                    {code && (
                      <div className="mt-1">
                        <p className="font-monospace fs-4">{code}</p>
                      </div>
                    )}
                  </div>
                  {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                      {message.text}
                    </div>
                  )}
                  <form className="user">
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
                        id="inputEmail"
                        aria-describedby="inputGroup-sizing-email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div
                      className="input-group mb-3"
                      style={{ height: "45px" }}
                    >
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-confirm-email"
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
                        id="inputConfirmEmail"
                        aria-describedby="inputGroup-sizing-confirm-email"
                        placeholder="Confirmer l'adresse e-mail"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={handleSendCode}
                        type="button"
                        className="btn btn-success rounded-5"
                      >
                        Envoyer le code
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CodeGenerator;
