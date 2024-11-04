"use client";

import React, { useEffect } from "react";
import components from "../components";

const Contact = () => {
  return (
    <>
      <title>La StAtion | Contact</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-12 mb-4 d-flex">
                <div className="w-100 d-flex">
                  <components.ContactForm />
                </div>
              </div>
              <components.ContactInfo />
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default Contact;
