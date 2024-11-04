"use client";

import React from "react";

const Carousel = () => {
  const items = [
    {
      imgSrc:
        "https://cdn.pixabay.com/photo/2021/10/23/15/48/lyon-6735243_1280.jpg",
      imgAlt: "Envie de nous rejoindre ?",
      captionTitle: "Envie de nous rejoindre ?",
      captionText:
        "La StAtion propose un espace de co-working et divers services pour accompagner vos projets.",
      btnText: "Contactez-nous maintenant !",
      btnLink: "/contact", // Local link
      captionClass: "text-start",
    },
    {
      imgSrc: "/img/holbertonschool.jpeg",
      imgAlt: "HOLBERTON SCHOOL",
      captionTitle: "HOLBERTON SCHOOL",
      captionText:
        "Venez découvrir Holberton School, une école spéciale, dans un lieu unique !",
      btnText: "Découvrir Holberton School",
      btnLink: "https://www.holbertonschool.fr", // External link
    },
    {
      imgSrc: "/img/la_prairie.jpg",
      imgAlt: "LA PRAIRIE",
      captionTitle: "LA PRAIRIE",
      captionText:
        "Venez découvrir notre espace de détente, pour vous relaxer, du 10 juillet au 20 septembre.",
      btnText: "Découvrez-en plus sur La Prairie !",
      btnLink: "#", // Local link
      btnClass: "btn btn-primary",
      captionClass: "text-end",
    },
  ];

  const CarouselItem = ({
    isActive,
    imgSrc,
    imgAlt,
    captionTitle,
    captionText,
    btnText,
    btnLink,
    btnClass = "btn btn-light",
    captionClass = "",
  }) => (
    <div className={`carousel-item ${isActive ? "active" : ""}`}>
      <img className="d-block w-100" src={imgSrc} alt={imgAlt} />
      <div className={`carousel-caption ${captionClass}`}>
        <h2>{captionTitle}</h2>
        {captionText && <p>{captionText}</p>}
        {btnLink && (
          <a
            className={btnClass}
            href={btnLink}
            target={btnLink.startsWith("http") ? "_blank" : "_self"} // Open external links in a new tab
            rel={btnLink.startsWith("http") ? "noopener noreferrer" : ""}
          >
            {btnText}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div
      id="myCarousel"
      className="carousel slide mb-3"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {items.map((item, index) => (
          <CarouselItem key={index} isActive={index === 0} {...item} />
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
