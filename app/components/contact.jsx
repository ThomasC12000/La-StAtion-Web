"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Nous répondons généralement sous 24 heures."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialiser les messages d'erreur et de succès
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    // Créer l'objet de données du formulaire
    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      // Soumettre les données à l'API (remplacez l'URL par celle de votre API)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      // Afficher le message de succès et mettre à jour l'alerte
      setSuccess("Votre message a été envoyé avec succès !");
      setAlertMessage(""); // Supprimer l'alerte permanente
      // Réinitialiser les champs du formulaire
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      // Afficher le message d'erreur
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card h-100 shadow-lg p-4 rounded-5 d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column flex-grow-1">
        <h5 className="card-title text-center mb-4">FORMULAIRE DE CONTACT</h5>

        {/* Afficher l'alerte permanente ou de succès */}
        {(alertMessage || success) && (
          <p
            className={`alert text-center ${
              success ? "alert-success" : "alert-info"
            }`}
          >
            {alertMessage || success}
          </p>
        )}

        {error && <p className="alert alert-danger text-center">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-grow-1"
        >
          <div className="row flex-grow-1">
            <div className="col-md-6 d-flex flex-column">
              <div className="mb-3">
                <label className="labels mb-1">Nom :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: "50px" }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="labels mb-1">Adresse e-mail :</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "50px" }}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="labels mb-1">Sujet :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Votre sujet"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ borderRadius: "50px" }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column">
              <div className="mb-3 flex-grow-1">
                <label className="labels mb-1">Message :</label>
                <textarea
                  className="form-control"
                  placeholder="Votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6"
                  style={{
                    borderRadius: "10px",
                    resize: "none",
                    maxHeight: "205px",
                    minHeight: "202px",
                  }}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button
              className={`btn btn-primary profile-button rounded-5 ${
                isSubmitting ? "disabled" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
