import React from "react";
import DateTime from "./DateTime/dateTime";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0 text-white">
            <span>
              <DateTime />
            </span>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end d-flex flex-column align-items-center align-items-md-end text-white">
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

export default Footer;
