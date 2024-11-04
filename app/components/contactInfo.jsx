"use client";

import React from "react";

const ContactInfo = () => {
  return (
    <div className="col-lg-5 col-md-12 mb-4 align-items-center">
      <div className="card shadow-lg p-4 rounded-5 d-flex flex-column">
        <h5 className="card-title text-center mb-4">INFORMATIONS DE CONTACT</h5>
        <p>
          <strong>Adresse :</strong> 19 Av. Amans Rodat, 12000 Rodez, France
        </p>
        <p>
          <strong>Téléphone :</strong>
          <a> 05.65.68.27.46</a>
        </p>
        <p>
          <strong>Heures d&apos;ouverture :</strong>
        </p>
        <ul>
          <li>Lundi - Vendredi : 9h00 - 18h00</li>
          <li>Samedi : 10h00 - 14h00</li>
          <li>Dimanche : Fermé</li>
        </ul>
        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.1105172142336!2d2.5639686157362046!3d44.349401879104665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b27d51e22f8d01%3A0x3d358415d4cc438d!2sLa%20StAtion!5e0!3m2!1sfr!2sfr!4v1691234567891!5m2!1sfr!2sfr"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="La StAtion Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
