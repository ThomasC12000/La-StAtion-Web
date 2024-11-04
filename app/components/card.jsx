import React from "react";
import Link from "next/link";

const cardData = [
  {
    title: "ESPACE DÉTENTE",
    imgSrc: "/img/espacedetente.jpg",
    imgAlt: "ESPACE DÉTENTE",
    description:
      "Pour manger, ou simplement boire un verre, La StAtion vous accueille dans un environnement chaleureux en plein coeur de la ville de Rodez.",
    buttonText: "En savoir plus...",
    link: "#",
  },
  {
    title: "RESTAURATION",
    imgSrc:
      "https://www.station-a.fr/wp-content/uploads/2021/09/station-a-foodbus-3-1024x683.jpg",
    imgAlt: "RESTAURATION",
    description:
      "Le FoodBus de La StAtion propose des pinsas (ancêtre de la pizza) à emporter préparées avec des produits frais et de qualité. Venez vite découvrir ça !",
    buttonText: "En savoir plus...",
    link: "./restauration",
  },
  {
    title: "ESPACE CO-WORKING",
    imgSrc:
      "https://www.station-a.fr/wp-content/uploads/2021/09/bureau_individuel_exemple-scaled.jpg",
    imgAlt: "ESPACE CO-WORKING",
    description:
      "La StAtion propose des espaces de travail, incluant bureaux et salles de réunion, à louer régulièrement ou ponctuellement. Venez découvrir nos offres !",
    buttonText: "En savoir plus...",
    link: "./espace-coworking",
  },
  {
    title: "STATIONNAUTES",
    imgSrc:
      "https://www.station-a.fr/wp-content/uploads/2021/12/242227458_822290131748251_8371732578103229171_n-391x260.jpg",
    imgAlt: "STATIONNAUTES",
    description:
      "Les « Stationnautes » sont les membres qui ont fait vivre La StAtion et font partie intégrante du projet. Découvrez qui ils sont !",
    buttonText: "En savoir plus...",
    link: "/stationnautes",
  },
  {
    title: "PROPOSER UN PROJET",
    imgSrc:
      "https://www.station-a.fr/wp-content/uploads/2021/09/ecurieNB-1024x683.jpg",
    imgAlt: "PROPOSER UN PROJET",
    description:
      "Proposez votre projet à La StAtion et contribuez à notre espace collaboratif. Nous accueillons toutes les idées innovantes pour enrichir notre communauté.",
    buttonText: "En savoir plus...",
    link: "./contact",
  },
  {
    title: "SOUTENIR LE PROJET",
    imgSrc:
      "https://www.station-a.fr/wp-content/uploads/2021/08/coursdhonneur-1024x683.jpg",
    imgAlt: "SOUTENIR LE PROJET",
    description:
      "Devenez sociétaire de La StAtion et participez aux décisions stratégiques du lieu. Ce projet collectif est conçu par et pour les usagers !",
    buttonText: "En savoir plus...",
    link: "./contact",
  },
  {
    title: "EVENEMENTS",
    imgSrc: "/img/evenements.jpg",
    imgAlt: "EVENEMENTS",
    description:
      "Venez découvrir les événements que La StAtion vous propose, bonne ambiance garantie !",
    buttonText: "En savoir plus...",
    link: "./evenements",
  },
  {
    title: "HOLBERTON SCHOOL",
    imgSrc:
      "https://cdn.prod.website-files.com/64107f65f30b69371e3d6bfa/644b94071ceca7d51d139d6f_Holberton%20actual%20digital%20school%20(1).png",
    imgAlt: "HOLBERTON SCHOOL",
    description:
      "Venez découvrir Holberton School, une école spéciale, dans un lieu unique !",
    buttonText: "En savoir plus...",
    link: "https://www.holbertonschool.fr/",
  },
  {
    title: "Fond’Actions Jeunes Crédit Agricole",
    imgSrc: "/img/CA_fondaction.JPG",
    imgAlt: "Fond’Actions Jeunes Crédit Agricole",
    description:
      "Vous êtes l’avenir du territoire, le Fond’Actions Jeunes donne de l’impulsion à vos projets professionnels !",
    buttonText: "En savoir plus...",
    link: "https://www.fondactions-canmp.com/holberton",
  },
];

const CardItem = ({ title, imgSrc, imgAlt, description, buttonText, link }) => (
  <div className="col-12 col-sm-6 col-md-4">
    <div className="card shadow-lg">
      <div className="card-header text-center">
        <h5 className="card-title">{title}</h5>
      </div>
      <div>
        <img
          className="card-img-top img-fluid"
          src={imgSrc}
          alt={imgAlt}
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <p className="card-text text-center">{description}</p>
        <center>
          {link.startsWith("http") ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary"
            >
              {buttonText}
            </a>
          ) : (
            <Link href={link} passHref>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                {buttonText}
              </button>
            </Link>
          )}
        </center>
      </div>
    </div>
  </div>
);

const Card = () => (
  <div className="container">
    <div className="row g-3">
      {cardData.map((card, index) => (
        <CardItem key={index} {...card} />
      ))}
    </div>
  </div>
);

export default Card;
