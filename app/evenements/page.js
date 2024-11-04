"use client";

import React, { useEffect, useState } from "react";
import components from "../components";

const Evenements = () => {
  const [events, setEvents] = useState([]);

  // Fonction pour charger les événements
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin-events", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        // Filtrer les événements à venir
        const upcomingEvents = data.filter(
          (event) => new Date(event.date) >= new Date()
        );
        setEvents(upcomingEvents);
      } else {
        console.error("Erreur lors du chargement des événements.");
      }
    } catch (error) {
      console.error("Erreur de récupération des événements :", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Formatage de la date en complet
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <>
      <title>La StAtion | Événements</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <div className="container mt-5 pt-5">
            {/* Section de résumé explicatif */}
            <div className="mb-5 p-4 shadow-lg text-center">
              <h3 className="font-weight-bold">
                Bienvenue aux événements de La St
                <strong style={{ color: "orange" }}>A</strong>tion
              </h3>
              <p className="lead">
                Découvrez les événements à venir organisés par La StAtion.
                <br />
                Que vous soyez intéressé par des ateliers, des conférences ou
                des rencontres, il y a quelque chose pour tout le monde !
                <br />
                Rejoignez-nous pour des moments d'apprentissage et de partage
                dans une ambiance conviviale et professionnelle.
              </p>
            </div>

            {events.length > 0 ? (
              <div className="row g-4">
                {events.map((event, index) => (
                  <div className="col-12 col-md-6 col-lg-4" key={index}>
                    <div className="card shadow-lg">
                      <div className="card-header bg-primary text-white text-center">
                        {event.title}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          {formatDate(event.date)} à {event.time}
                        </h5>
                        <p className="card-text text-center">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="lead text-gray-800 mb-5">
                  Aucun événement à venir.
                </p>
              </div>
            )}
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default Evenements;
