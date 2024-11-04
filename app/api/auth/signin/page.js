"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import components from "../../../components";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../../../utils/checkAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(
        () => {
          setMessage({ text: "", type: "" });
        },
        message.type === "success" ? 3000 : 5000
      );

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const authenticate = async () => {
      const session = await checkAuth();
      if (session) {
        router.replace("/");
      }
    };
    authenticate();
  }, [router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { email, password });

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result.error) {
        const error = JSON.parse(result.error);
        setMessage({ text: error.message, type: "error" });
      } else {
        setMessage({
          text: "Connexion réussie. Redirection en cours...",
          type: "success",
        });
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage({
        text: "Une erreur est survenue lors de la connexion.",
        type: "danger",
      });
    }
  };
  return (
    <>
      <title>La StAtion | Connexion</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="card shadow-lg p-3 rounded-5">
                  <h1 className="h4 text-center text-gray-900 mb-4">
                    Bienvenue !
                  </h1>
                  <div className="text-center">
                    <p className="mb-4">
                      Connectez-vous à l&apos;aide de votre adresse e-mail et
                      votre mot de passe !
                    </p>
                  </div>
                  {message.text && (
                    <div className={`alert alert-${message.type}`} role="alert">
                      {message.text}
                    </div>
                  )}
                  <form className="user" onSubmit={handleSignIn}>
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
                      />
                    </div>
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
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          height: "100%",
                        }}
                      />
                    </div>
                    <center>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block rounded-5"
                      >
                        Se connecter
                      </button>
                    </center>
                    <hr />
                  </form>
                  <div className="text-center">
                    <Link
                      className="small"
                      href="./password"
                      style={{ textDecoration: "none" }}
                    >
                      Mot de passe oublié ?
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

export default LoginForm;
