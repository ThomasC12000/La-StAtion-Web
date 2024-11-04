"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import components from "../../../../components";
import Link from "next/link";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [token, setToken] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.token) {
      setToken(params.token);
    } else {
      setMessage({ text: "Token manquant ou invalide !", type: "danger" });
    }
  }, [params]);

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

    if (newPassword !== confirmNewPassword) {
      setMessage({
        text: "Les mots de passe ne correspondent pas !",
        type: "danger",
      });
      return;
    }

    if (!token) {
      setMessage({ text: "Token manquant ou invalide !", type: "danger" });
      return;
    }

    try {
      const response = await fetch("/api/auth/password/resetPasswordVerif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetPasswordToken: token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de réinitialisation !");
      }

      setMessage({
        text: `${data.message} Redirection en cours...`,
        type: "success",
      });
      setTimeout(() => {
        router.push("/api/auth/signin");
      }, 3000);
    } catch (error) {
      setMessage({
        text: error.message || "Erreur de réinitialisation !",
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
                <Link href="../newUser" passHref>
                  <button className="btn btn-outline-light me-2">
                    S&apos;inscrire
                  </button>
                </Link>
                <Link href="../signin" passHref>
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
                <div className="card shadow p-3 rounded-5">
                  <h1 className="h4 text-center text-gray-900 mb-4">
                    Réinitialisation du mot de passe
                  </h1>
                  <div className="text-center">
                    <p className="mb-4">
                      Veuillez entrer votre nouveau mot de passe ci-dessous.
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
                        className="form-control"
                        id="exampleInputPassword"
                        aria-describedby="inputGroup-sizing-password"
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                        required
                      />
                    </div>
                    <div
                      className="input-group mb-3"
                      style={{ height: "45px" }}
                    >
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
                        className="form-control"
                        id="exampleInputConfirmPassword"
                        aria-describedby="inputGroup-sizing-confirm-password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                        Réinitialiser le mot de passe
                      </button>
                    </center>
                    <hr />
                  </form>
                  <div className="text-center">
                    <Link
                      className="small"
                      href="../signin"
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
