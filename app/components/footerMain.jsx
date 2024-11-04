import React from "react";
import DateTime from "./DateTime/dateTime";
import "../globals.css";

const FooterMain = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 vertical-divider d-none d-md-block text-white">
            <center>
              <h5>Contact</h5>
            </center>
            <div>
              <p className="text-start text-white">
                <i
                  className="fa fa-phone"
                  aria-hidden="true"
                  style={{ marginRight: "6.4px" }}
                ></i>
                :&nbsp; <a>05 65 68 56 36</a>
                <br />
                <i
                  className="fa fa-at"
                  aria-hidden="true"
                  style={{ marginRight: "6.4px" }}
                ></i>
                :&nbsp; contact@station-a.fr
                <br />
                <i
                  className="fa fa-location-dot"
                  aria-hidden="true"
                  style={{ marginRight: "4px", marginLeft: "2.1px" }}
                ></i>
                <i>&nbsp;</i>
                :&nbsp; 19 Avenue Amans Rodat, 12000 Rodez, France
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 vertical-divider d-none d-md-block text-white">
            <center>
              <h5>Horaires d&apos;ouverture</h5>
            </center>
            <div>
              <strong>Lundi :</strong> Fermé
              <br />
              <strong>Mardi au Samedi :</strong> 17h - 00H
              <br />
              <strong>Dimanche :</strong> Fermé
            </div>
          </div>
          <div className="col-lg-4 col-md-12 text-md-end text-center text-white">
            <h5>Suivez-nous</h5>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a
                href="https://www.facebook.com/la.prairie.rodez/"
                className="btn btn-outline-dark btn-sm me-2 social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/la.station.rodez/"
                className="btn btn-outline-dark btn-sm me-2 social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com/StationA15"
                className="btn btn-outline-dark btn-sm me-2 social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <br />
            <a
              href="./landing-page"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              En savoir plus sur notre histoire ? Cliquez ici !
            </a>
          </div>
        </div>
        <hr className="w-100 mt-4 mb-2 text-white" />
        <div className="row align-items-center justify-content-center text-center text-white">
          <div className="col-12 col-md-6 text-md-start">
            <DateTime />
          </div>
          <div className="col-12 col-md-6 mt-2 mt-md-0 text-md-end">
            <span>
              &copy; La St
              <strong style={{ color: "orange" }}>A</strong>tion 2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
