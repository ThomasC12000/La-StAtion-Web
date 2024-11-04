"use client";

import React from "react";
import components from "../components";

const people = [
  {
    name: "Anne Garibal",
    profession: "Énergéticienne",
    image: "img/stationnautes/anne-garibal.jpg", // Remplacez par le chemin réel de l'image
    summary:
      "Anne à installé son cabinet à Station A où elle pratique son activité d’énergéticienne et propose aussi des stages de découverte.",
    phone: "06 33 94 69 65",
    email: "annegaribal@yahoo.fr",
    website: "annegaribal.wixsite.com",
    social: {
      facebook: "https://www.facebook.com/anne.garibal",
      linkedin: "https://www.linkedin.com/in/anne-garibal-902a04115/",
    },
  },
  {
    name: "Fabien Marcorelles",
    image: "img/stationnautes/fabien-marcorelles.jpg", // Remplacez par le chemin réel de l'image
    profession: "Photographe",
    summary:
      "Photographe professionnel depuis 2015, c’est grâce aux talents de Fabien que vous pouvez voir les visages et production des stationnautes.",
    phone: "06 12 66 21 26",
    email: "jane.smith@example.com",
    social: {
      facebook: "https://www.facebook.com/fmarcorellesstudio",
      linkedin: "https://www.linkedin.com/in/fabien-marcorelles-400887128/",
      instagram: "https://www.instagram.com/fabien_marcorelles/",
    },
  },
  {
    name: "Patricia Girard",
    image: "img/stationnautes/patricia-girard.jpg", // Remplacez par le chemin réel de l'image
    profession: "Professeure de yoga, Art et Yoga",
    summary:
      "Patricia propose des cours de Yoga Vinyasa et Yoga Postural, ainsi que des stages de découverte le week-end.",
    phone: "06 21 86 55 06",
    email: "artyogaveyron@gmail.com",
    social: {
      facebook: "https://www.facebook.com/yogarodez/",
      linkedin: "https://www.linkedin.com/in/patricia-girard-8192b8132/",
    },
  },
  {
    name: "Mathilde Sahuguet",
    image: "img/stationnautes/mathilde-sahuguet.jpg", // Remplacez par le chemin réel de l'image
    profession: "Monitrice à vélo",
    summary:
      "Mathilde propose de la location simple et des sorties à vélo et VTT à assistance électrique à Rodez et ses alentours.",
    phone: "07 60 10 84 99",
    email: "mathilde@aveyronavelo.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "James Hennessy",
    image: "img/stationnautes/james-hennessy.jpg", // Remplacez par le chemin réel de l'image
    profession: "Réparateur vélo",
    summary:
      "Mécanicien spécialisé et ancien londonien installé à Rodez depuis 13 ans, James répare les vélos dans son atelier ou se déplace à domicile.",
    phone: "06 67 39 34 30",
    email: "hello@mistervelo.eu",
    website: "mistervelo.eu",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Arnaud Mirabel",
    image: "img/stationnautes/arnaud-mirabel.jpg", // Remplacez par le chemin réel de l'image
    profession: "Paysagiste Concepteur",
    summary:
      "Passionné de paysages et de jardins depuis tout jeune, il exerce depuis 2018 le métier de paysagiste.",
    phone: "06 71 81 25 28",
    email: "am.jardinsetpaysages@gmail.com",
    website: "arnaudmirabel.com",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Florence Olmi",
    image: "img/stationnautes/florence-olmi.jpg", // Remplacez par le chemin réel de l'image
    profession: "Mosaïste d'art​",
    summary:
      "Installée à Station A depuis septembre 2020, Florence assemble avec goût des parcelles de mosaïques pour créer des œuvres uniques.",
    phone: "06 14 48 85 87",
    email: "florence.olmi@wanadoo.fr",
    website: "florence-olmi.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Maren Focken et Sophie Verin",
    image: "img/stationnautes/maren-focken-sophie-verin.jpg", // Remplacez par le chemin réel de l'image
    profession: "Médiatrices familiales",
    summary:
      "Avec Tangram Médiation, Maren et Sophie accompagnent des personnes pour trouver des solutions amiables adaptées à leurs problèmes.",
    phone: "07 60 10 84 99",
    email: "mathilde@aveyronavelo.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Kevin Joly",
    image: "img/stationnautes/kevin-joly.jpg", // Remplacez par le chemin réel de l'image
    profession: "Artisan numérique",
    website: "i-craft.fr",
    summary:
      "Passionné par la technologie et la taille de la pierre, Kevin est un artisan numérique qui manie des outils technologiques au cours du processus de fabrication ou de conception d’un produit.",
    phone: "06 42 29 32 14",
    email: "contact@i-craft.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Laurent Khougazian",
    image: "img/stationnautes/laurent-khougazian.jpg", // Remplacez par le chemin réel de l'image
    profession: "Hypnothérapeuthe",
    summary:
      "Tous les mardis, Laurent accueille dans le cabinet qu’il partage avec Anne Garibal, des personnes en difficulté pour les aider à surmonter les épreuves de la vie.",
    phone: "06 77 33 50 76",
    email: "khougazian@hotmail.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Djamel Benghanem",
    image: "img/stationnautes/djamel-benghanem.jpg", // Remplacez par le chemin réel de l'image
    profession: "Professeur de Qi Jong",
    summary:
      "Djamel Benghanem enseigne le Qi Gong, le Tai Ji Quan et la méditation. Les activités sont proposées sous forme de séances hebdomadaires, stages, retraites et cours particuliers.",
    phone: "07 60 10 84 99",
    email: "lesouffleduroseau@gmail.com",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
  {
    name: "Luca Gioia",
    image: "img/stationnautes/luca-gioia.jpg", // Remplacez par le chemin réel de l'image
    profession: "Designer graphique",
    summary:
      "Luca a installé son studio “Les Réplicants” à Station A en avril 2021 où il exerce la profession de directeur artistique et designer graphique. ",
    phone: "06 37 64 18 96",
    email: "luca@les-replicants.fr",
    social: {
      facebook: "https://www.linkedin.com/in/johndoe",
      linkedin: "https://twitter.com/johndoe",
      instagram: "https://facebook.com/johndoe",
    },
  },
];

const PersonCard = ({ person }) => (
  <div className="col-lg-3 col-md-6 mb-4">
    <div className="card-stationautes h-100 border shadow-lg p-4 rounded-5 d-flex flex-column">
      <img
        src={person.image}
        className="card-img-top rounded-5 mx-auto d-block"
        alt={person.name}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <hr className="my-3" />
      <div className="card-body d-flex flex-column text-center flex-grow-1">
        <h5 className="card-title mb-2">{person.name}</h5>
        <p
          className="card-profession mb-2"
          style={{ color: "orange", fontStyle: "italic" }}
        >
          {person.profession}
        </p>
        <p className="card-text mb-1">{person.summary}</p>
        <hr className="my-3" />
        <div className="contact-info text-start mb-3">
          <p className="mb-1">
            <strong>Téléphone :</strong>{" "}
            <a
              href={`tel:${person.phone}`}
              className="text-decoration-none"
              style={{ color: "black" }}
            >
              {person.phone}
            </a>
          </p>
          <p className="mb-1 d-flex align-items-center">
            <strong className="me-1">Email :</strong>{" "}
            <a
              href={`mailto:${person.email}`}
              className="text-decoration-none"
              style={{
                flexShrink: 0, // Évite que l'élément se rétrécisse
                maxWidth: "200px", // Ajustez cette valeur selon vos besoins
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={person.email}
            >
              {person.email}
            </a>
          </p>
          {person.website && (
            <p className="mb-1">
              <strong>Web :</strong>{" "}
              <a
                href={`https://${person.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                {person.website}
              </a>
            </p>
          )}
        </div>
        <div className="d-flex justify-content-center">
          {person.social.facebook && (
            <a
              href={person.social.facebook}
              className="btn btn-social-icon me-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          )}
          {person.social.linkedin && (
            <a
              href={person.social.linkedin}
              className="btn btn-social-icon me-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {person.social.instagram && (
            <a
              href={person.social.instagram}
              className="btn btn-social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

const Stationautes = () => {
  return (
    <>
      <title>La StAtion | Stationautes</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <div className="container mt-5 pt-5">
            {/* Section avec titre et histoire */}
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <div className="mb-5 p-4 shadow-lg text-center">
                  <h3 className="font-weight-bold">
                    Rencontrer les stAtionnautes de La St
                    <strong style={{ color: "#FFA500" }}>A</strong>tion
                  </h3>
                  <p className="lead">
                    Ceux qui ont choisi de venir travailler au quotidien dans
                    nos espaces locatifs sont les « Stationnautes ». Ils et
                    elles font partie intégrante du projet. Pour eux, Station A
                    c’est un lieu de travail mais aussi un lieu de vie sociale
                    et de divertissement. C’est une nouvelle façon de travailler
                    : il y a l’intangible discussion de la machine à café qui
                    mènera à créer des amitiés, puis des idées, puis des
                    projets.
                  </p>
                </div>
              </div>
            </div>
            {/* Cartes des personnes */}
            <div className="row justify-content-center">
              {people.map((person, index) => (
                <PersonCard key={index} person={person} />
              ))}
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default Stationautes;
