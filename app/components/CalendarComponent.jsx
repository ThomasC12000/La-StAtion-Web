"use client";

import React, { useState, useEffect } from "react";

const CalendarComponent = ({ events, handleDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    // Ajuste pour commencer la semaine le lundi
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const formatDateForComparison = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    let day = 1;

    // Ajouter des cellules vides avant le début du mois
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    // Ajouter des cellules pour chaque jour du mois
    while (day <= daysInMonth) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const formattedDate = `${day}/${month + 1}/${year}`;
      const hasEvent = events.some(
        (event) => formatDateForComparison(event.date) === formattedDate
      );

      days.push(
        <td
          key={day}
          className={`calendar-day ${hasEvent ? "event-day" : ""}`}
          data-date={formattedDate}
          onClick={() => handleDayClick(formattedDate)}
        >
          {day}
        </td>
      );
      day++;
    }

    // Ajouter des cellules vides après la fin du mois pour compléter la dernière ligne
    const totalCells = days.length + ((7 - (days.length % 7)) % 7);
    for (let i = days.length; i < totalCells; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    // Diviser les jours en semaines
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i}`}>{days.slice(i, i + 7)}</tr>);
    }

    return weeks;
  };

  return (
    <div className="card calendar-card shadow-lg p-4 rounded-5">
      <h2 className="text-center mb-4">Calendrier</h2>
      <div className="calendar-header d-flex justify-content-center bg-light p-2">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <span className="calendar-text me-2">
          {currentDate
            .toLocaleString("fr-FR", {
              month: "long",
              year: "numeric",
            })
            .toUpperCase()}
        </span>
        <button className="btn btn-outline-secondary" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
            <th>Dim</th>
          </tr>
        </thead>
        <tbody>{renderCalendarDays()}</tbody>
      </table>
    </div>
  );
};

export default CalendarComponent;
