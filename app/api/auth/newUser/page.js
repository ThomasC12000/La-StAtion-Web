"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import components from "../../../components";
import { checkAuth } from "../../../../utils/checkAuth";
import { useRouter } from "next/navigation";

const Register = () => {
  const [secretCode, setSecretCode] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretCode: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const session = await checkAuth();
      if (session) {
        router.replace("/");
      }
    };
    authenticate();
  }, [router]);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(
        () => setMessage({ text: "", type: "" }),
        message.type === "success" ? 3000 : 5000
      );
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        text: "Les mots de passe ne correspondent pas",
        type: "danger",
      });
      return;
    }

    try {
      // Vérifier le code secret
      const res = await fetch("/api/secretCode/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretCode: formData.secretCode }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        setMessage({
          text:
            data.message || "Erreur lors de la vérification du code secret.",
          type: "danger",
        });
        return;
      }

      // Si le code secret est valide, procéder à l'inscription
      const registerRes = await fetch("/api/auth/newUser/newUserRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });

      const registerData = await registerRes.json();

      if (registerRes.status === 201) {
        setMessage({
          text: `${registerData.message} Redirection en cours...`,
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "./signin";
        }, 3000);
      } else {
        setMessage({ text: registerData.message, type: "danger" });
      }
    } catch (error) {
      setMessage({
        text: "Une erreur est survenue. Veuillez réessayer plus tard.",
        type: "danger",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fonction pour formater le code secret
  const formatCode = (code) => {
    const cleaned = code.replace(/[^A-Za-z0-9]/g, "");
    const formatted = cleaned.toUpperCase().replace(/(.{4})(?=.)/g, "$1-");
    return formatted;
  };

  const handleChangeSecret = (event) => {
    const { value } = event.target;
    setSecretCode(formatCode(value));
    setFormData((prevData) => ({ ...prevData, secretCode: value }));
  };

  return (
    <>
      <title>La StAtion | Inscription</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg p-3 rounded-5">
                  <h1 className="h4 text-center text-gray-900 mb-4">
                    Créer un compte
                  </h1>

                  {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                      {message.text}
                    </div>
                  )}

                  <form className="user" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="input-group" style={{ height: "45px" }}>
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-firstname"
                            style={{
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              height: "100%",
                            }}
                          >
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            aria-describedby="inputGroup-sizing-firstname"
                            placeholder="Prénom"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={{
                              borderTopRightRadius: "50px",
                              borderBottomRightRadius: "50px",
                              height: "100%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="input-group" style={{ height: "45px" }}>
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-lastname"
                            style={{
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              height: "100%",
                            }}
                          >
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            aria-describedby="inputGroup-sizing-lastname"
                            placeholder="Nom de famille"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={{
                              borderTopRightRadius: "50px",
                              borderBottomRightRadius: "50px",
                              height: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>

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
                        name="email"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-email"
                        placeholder="Adresse e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="input-group" style={{ height: "45px" }}>
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-password"
                            style={{
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              height: "100%",
                            }}
                          >
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            aria-describedby="inputGroup-sizing-password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                              borderTopRightRadius: "50px",
                              borderBottomRightRadius: "50px",
                              height: "100%",
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="input-group" style={{ height: "45px" }}>
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-confirm-password"
                            style={{
                              borderTopLeftRadius: "50px",
                              borderBottomLeftRadius: "50px",
                              height: "100%",
                            }}
                          >
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            aria-describedby="inputGroup-sizing-confirm-password"
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                              borderTopRightRadius: "50px",
                              borderBottomRightRadius: "50px",
                              height: "100%",
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="input-group mb-3"
                      style={{ height: "45px" }}
                    >
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-secret-code"
                        style={{
                          borderTopLeftRadius: "50px",
                          borderBottomLeftRadius: "50px",
                          height: "100%",
                        }}
                      >
                        <i className="fas fa-key"></i>
                      </span>
                      <input
                        type="text"
                        name="secretCode"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-secret-code"
                        placeholder="Code secret"
                        value={secretCode}
                        onChange={handleChangeSecret}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                        maxLength="14"
                        required
                      />
                    </div>

                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block rounded-5"
                      >
                        Créer un compte
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

export default Register;
