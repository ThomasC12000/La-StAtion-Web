"use client";

import React, { useEffect, useState } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  const updateDateTime = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    // Obtenez la date complète et le jour de la semaine séparément
    const dateStr = date.toLocaleDateString("fr-FR", options);
    const weekdayStr = date.toLocaleDateString("fr-FR", { weekday: "long" });

    // Mettez la première lettre du jour de la semaine en majuscule
    const formattedWeekday =
      weekdayStr.charAt(0).toUpperCase() + weekdayStr.slice(1);

    // Remplacez le jour de la semaine dans la chaîne complète
    const updatedDateStr = dateStr.replace(weekdayStr, formattedWeekday);

    setCurrentDateTime(updatedDateStr);
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <div id="date_time">{currentDateTime}</div>;
};

export default DateTime;
