"use client";

import React, { useEffect, useState } from "react";
import components from "../app/components";

const StartPage = () => {
  const [events, setEvents] = useState([]);

  // Effect pour charger les événements et ajouter le script Elfsight
  useEffect(() => {
    // Ajouter dynamiquement le script Elfsight
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    // Fonction pour charger les événements
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/admin-events", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();

          // Filtrer les événements pour garder uniquement ceux à venir
          const now = new Date();
          const upcomingEvents = data.filter((event) => {
            const eventDate = new Date(`${event.date}T${event.time}`);
            return eventDate >= now;
          });

          // Trier les événements à venir par date et heure pour obtenir le plus proche
          const sortedUpcomingEvents = upcomingEvents.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
          });

          setEvents(sortedUpcomingEvents);
        } else {
          console.error("Erreur lors du chargement des événements.");
        }
      } catch (error) {
        console.error("Erreur de récupération des événements :", error);
      }
    };

    fetchEvents();

    return () => {
      // Nettoyer le script lors du démontage du composant
      document.body.removeChild(script);
    };
  }, []);

  // Trouver le prochain événement
  const nextEvent = events.length > 0 ? events[0] : null;

  // Formatage de la date en complet
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Formatage de l'heure
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}h${minutes}`;
  };

  return (
    <>
      <title>La StAtion | Rodez</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <components.Carousel />
          <div className="container">
            {nextEvent ? (
              <div className="card shadow-lg border-primary mb-4">
                <div className="card-header bg-primary text-white text-center">
                  Prochain événement à venir :
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {nextEvent.title}, le {formatDate(nextEvent.date)} à partir
                    de {formatTime(nextEvent.time)}.
                  </h5>
                </div>
              </div>
            ) : (
              <div className="card shadow-lg border-warning mb-4">
                <div className="card-header bg-warning text-dark text-center">
                  Prochain événement
                </div>
                <div className="card-body">
                  <h5 className="card-text text-center">
                    Il n&apos;y a actuellement aucun événement planifié.
                  </h5>
                </div>
              </div>
            )}
          </div>
          <components.Card />
          <div className="container mt-5">
            <div
              className="elfsight-app-ea81726b-eff6-4d5f-8e3b-99830edab9f8"
              data-elfsight-app-lazy
            ></div>
          </div>
          <br />
          <br />
        </main>
        <components.footerMain />
      </div>
    </>
  );
};

export default StartPage;
