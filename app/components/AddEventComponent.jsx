"use client";

import React, { useState } from "react";

const AddEventComponent = ({ events, setEvents }) => {
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: "", date: "" });
    }
  };

  return (
    <div className="card add-event-card shadow-lg p-4 rounded-5">
      <h2 className="text-center mb-4">Ajouter un Événement</h2>
      <div className="card-body d-flex flex-column">
        <form>
          <div className="mb-3">
            <label htmlFor="eventTitle" className="form-label">
              Titre de l&apos;événement
            </label>
            <input
              type="text"
              className="form-control"
              id="eventTitle"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              style={{
                borderRadius: "50px",
                height: "65%",
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="eventDate" className="form-label">
              Date de l&apos;événement
            </label>
            <input
              type="date"
              className="form-control"
              id="eventDate"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              style={{
                borderRadius: "50px",
                height: "65%",
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mx-auto d-block"
            onClick={handleAddEvent}
            style={{
              borderRadius: "50px",
              height: "65%",
            }}
          >
            Ajouter l&apos;événement
          </button>
        </form>
        <hr />
        <div>
          <h4>Événements à venir :</h4>
          {events.map((event, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded ${getEventColor(event.date)}`}
            >
              <strong>{formatDateForComparison(event.date)}</strong> :{" "}
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEventComponent;
