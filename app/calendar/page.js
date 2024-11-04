"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import components from "../../app/components";

const Calendar = () => {
  const { data: session } = useSession();
  const [alert, setAlert] = useState({ text: "", type: "" });
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    priority: "peu_important",
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Fonction pour trier les événements par date et heure
  const sortEvents = (events) => {
    return [...events].sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
    );
  };

  const showAlert = (text, type = "danger") => {
    setAlert({ text, type });
    setTimeout(() => setAlert({ text: "", type: "" }), 5000); // Supprime l'alerte après 5 secondes
  };

  // Charger les événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/calendar?userId=${encodeURIComponent(session.user.id)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // Filtrer les événements à venir
            const upcomingEvents = data.filter(
              (event) => new Date(`${event.date}T${event.time}`) >= new Date()
            );
            setEvents(sortEvents(upcomingEvents));
          } else {
            console.error("Erreur lors du chargement des événements.");
          }
        } catch (error) {
          console.error("Erreur de récupération des événements :", error);
        }
      }
    };

    fetchEvents();
  }, [session]);

  // Fonction pour ajouter un événement
  const handleAddEvent = async () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.priority
    ) {
      showAlert("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEvent, userId: session.user.id }),
      });

      if (response.ok) {
        const addedEvent = await response.json();
        setEvents((prevEvents) => sortEvents([...prevEvents, addedEvent]));
        setNewEvent({
          title: "",
          date: "",
          time: "",
          priority: "peu_important",
        });
        showAlert("Événement ajouté avec succès.", "success");
      } else {
        const errorData = await response.json();
        showAlert(`Erreur lors de l'ajout de l'événement: ${errorData.error}`);
      }
    } catch (error) {
      showAlert("Erreur d'ajout de l'événement.");
    }
  };

  // Fonction pour supprimer un événement
  const handleDeleteEvent = async (eventToDelete) => {
    try {
      const response = await fetch("/api/calendar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: eventToDelete._id }),
      });

      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventToDelete._id)
        );
      } else {
        console.error("Erreur lors de la suppression de l'événement.");
      }
    } catch (error) {
      console.error("Erreur de suppression de l'événement :", error);
    }
  };

  // Fonction pour obtenir les jours du mois
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  // Fonction pour obtenir le premier jour du mois
  const getFirstDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
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
    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year}`;
  };

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const eventColors = {
    tres_important: "bg-danger text-white",
    important: "bg-warning text-dark",
    peu_important: "bg-success text-white",
  };

  const getEventColor = (priority) =>
    eventColors[priority] || eventColors.peu_important;

  const getHighestPriorityEvent = (eventsForDay) => {
    if (eventsForDay.length === 0) return null;
    if (eventsForDay.some((event) => event.priority === "tres_important"))
      return "bg-danger";
    if (eventsForDay.some((event) => event.priority === "important"))
      return "bg-warning";
    return "bg-success";
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    let day = 1;

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    while (day <= daysInMonth) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const formattedDate = `${String(day).padStart(2, "0")}/${String(
        month + 1
      ).padStart(2, "0")}/${year}`;
      const eventsForDay = events.filter(
        (event) => formatDateForComparison(event.date) === formattedDate
      );

      const eventClass = getHighestPriorityEvent(eventsForDay);

      days.push(
        <td
          key={day}
          className={`calendar-day ${eventClass}`}
          data-date={formattedDate}
          onClick={() => handleDayClick(formattedDate)}
        >
          {day}
        </td>
      );
      day++;
    }

    const totalCells = days.length + ((7 - (days.length % 7)) % 7);
    for (let i = days.length; i < totalCells; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i}`}>{days.slice(i, i + 7)}</tr>);
    }

    return weeks;
  };

  const renderEventsForDate = () => {
    const eventsForDate = events.filter(
      (event) => formatDateForComparison(event.date) === selectedDate
    );

    return eventsForDate.length === 0 ? (
      <p>Aucun événement pour cette date.</p>
    ) : (
      eventsForDate.map((event, index) => {
        const eventColorClass = getEventColor(event.priority);

        return (
          <div
            key={index}
            className={`p-2 my-1 rounded ${eventColorClass} event-box`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <strong>{formatDateForComparison(event.date)}</strong> :{" "}
              {event.title} à {event.time}
            </span>
            <button
              className="btn btn-sm"
              onClick={() => handleDeleteEvent(event)}
              style={{ color: "black", background: "none", border: "none" }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        );
      })
    );
  };

  if (!session?.user) {
    return <components.inviteNoAuth />;
  }

  return (
    <>
      <title>La StAtion | Calendrier</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-5 pt-5">
            <div className="row">
              {/* Calendar Card */}
              <div className="col-md-7 d-flex flex-column">
                <div className="card calendar-card shadow p-4 rounded-5 flex-grow-1">
                  <h2 className="text-center mb-4">Calendrier</h2>
                  <div className="calendar-header d-flex justify-content-center bg-light p-2">
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={handlePrevMonth}
                    >
                      &lt;
                    </button>
                    <span className="calendar-text me-2">
                      {currentDate.toLocaleString("fr-FR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleNextMonth}
                    >
                      &gt;
                    </button>
                  </div>
                  <div className="table-responsive">
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
                  {selectedDate && (
                    <div className="mt-4">
                      <h4>Événements pour le {selectedDate}</h4>
                      {renderEventsForDate()}
                    </div>
                  )}
                </div>
              </div>
              {/* Add Event Card */}
              <div className="col-md-5 mt-4 mt-md-0 d-flex flex-column">
                <div className="card add-event-card shadow p-4 rounded-5 flex-grow-1">
                  <h2 className="text-center mb-4">Ajouter un Événement</h2>
                  <div className="card-body d-flex flex-column">
                    <form>
                      {alert.text && (
                        <div
                          className={`alert alert-${alert.type}`}
                          role="alert"
                        >
                          {alert.text}
                        </div>
                      )}
                      <div className="mb-3">
                        <label htmlFor="eventTitle" className="form-label">
                          Titre de l&apos;événement
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          id="eventTitle"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="eventDate" className="form-label">
                          Date de l&apos;événement
                        </label>
                        <input
                          type="date"
                          className="form-control rounded-pill"
                          id="eventDate"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="eventTime" className="form-label">
                          Heure de l&apos;événement
                        </label>
                        <input
                          type="time"
                          className="form-control rounded-pill"
                          id="eventTime"
                          value={newEvent.time}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, time: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="eventPriority" className="form-label">
                          Priorité de l&apos;événement
                        </label>
                        <select
                          className="form-control rounded-pill"
                          id="eventPriority"
                          value={newEvent.priority}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option value="peu_important">Peu Important</option>
                          <option value="important">Important</option>
                          <option value="tres_important">Très Important</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mx-auto d-block rounded-pill"
                        onClick={handleAddEvent}
                      >
                        Ajouter l&apos;événement
                      </button>
                    </form>
                    <hr />
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "300px" }}
                    >
                      <h4>Événements à venir :</h4>
                      {events.length > 0 ? (
                        events.map((event, index) => (
                          <div
                            key={index}
                            className={`p-2 my-1 rounded ${getEventColor(
                              event.priority
                            )}`}
                          >
                            <strong>
                              {formatDateForComparison(event.date)}
                            </strong>{" "}
                            : {event.title} à {event.time}
                          </div>
                        ))
                      ) : (
                        <p>Aucun événement à venir.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-4">
          <components.Footer />
        </footer>
      </div>
    </>
  );
};

export default Calendar;
