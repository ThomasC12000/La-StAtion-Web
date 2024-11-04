"use client";

import React from "react";
import components from "../components";

const CoworkingPage = () => {
  const cardData = [
    {
      title: "OPEN SPACE",
      imgSrc: "/img/co_working/open_space.jpg",
      imgAlt: "Description de l'image",
      description:
        "Pour manger, ou simplement boire un verre, La StAtion vous accueille dans un environnement chaleureux en plein coeur de la ville de Rodez.",
      inclusions: [
        "13€ / jour",
        "140 € / mois - Temps partiel",
        "199€ / mois - Plein temps",
      ],
    },
    {
      title: "SALLE DE RÉUNION",
      imgSrc: "/img/co_working/salle_de_reunion.jpg",
      imgAlt: "Description de l'image",
      description:
        "Le FoodBus de La StAtion propose des pinsas (ancêtre de la pizza) à emporter préparées avec des produits frais et de qualité. Venez vite découvrir ça !",
      inclusions: [
        "200 € / journée",
        "Vidéo projecteur et paperboard sur demande",
      ],
    },
    {
      title: "ESPACE DETENTE",
      imgSrc: "/img/co_working/espacedetente.jpg",
      imgAlt: "Description de l'image",
      description:
        "Les « Stationnautes » sont les membres qui ont fait vivre La StAtion et font partie intégrante du projet. Découvrez qui ils sont !",
      inclusions: ["Gratuit pour la journée - 1 fois / semaine"],
    },
    {
      title: "BUREAU INDIVIDUEL",
      imgSrc: "/img/co_working/bureau_individuel_1.jpeg",
      imgAlt: "Description de l'image",
      description:
        "Espace de travail, disponible à la journée ou à la demi-journée. C’est un bureau fermé, au calme, idéal pour les rendez-vous individuels, séances de coaching.",
      inclusions: ["Location pour 1 mois minimum"],
    },
    {
      title: "BUREAU INDIVIDUEL",
      imgSrc: "/img/co_working/bureau_individuel_2.jpg",
      imgAlt: "Description de l'image",
      description:
        "Espace de travail, disponible à la journée ou à la demi-journée. C’est un bureau fermé, au calme, idéal pour les rendez-vous individuels, séances de coaching.",
      inclusions: ["Location pour 1 mois minimum"],
    },
    {
      title: "ISOLOIR",
      imgSrc:
        "https://www.station-a.fr/wp-content/uploads/2021/09/bureau_individuel_exemple-scaled.jpg",
      imgAlt: "Description de l'image",
      description:
        "La StAtion propose des espaces de travail, incluant bureaux et salles de réunion, à louer régulièrement ou ponctuellement. Venez découvrir nos offres !",
      inclusions: ["A disposition pour tout les membres"],
    },
  ];

  const CardItem = ({
    title,
    imgSrc,
    imgAlt,
    description,
    inclusions = [],
  }) => (
    <div className="col-12 col-sm-6 col-md-4 d-flex">
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
        </div>
        <div className="mt-1 mb-3 pt-1 px-4">
          {inclusions.map((inclusion, index) => (
            <p className="mb-2" key={index}>
              <i className="fa fa-check-circle text-success me-2"></i>
              <b>{inclusion}</b>
            </p>
          ))}
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

  const handleKeyDown = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  };

  function sendEmail() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const subject = "Demande de rappel espace co-working";
    const body = `Bonjour, je souhaite être rappelé concernant la formule sur mesure des espaces de co-working. Voici mon numéro : ${phoneNumber}`;

    window.location.href = `mailto:contact@station-a.fr?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <title>La StAtion | Espace Coworking</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <div className="container mt-5 pt-5">
            {/* Section d'introduction */}
            <div className="mb-5 p-4 shadow-lg text-center">
              <h3 className="font-weight-bold">
                Espace co-working de La St
                <strong style={{ color: "#FFA500" }}>A</strong>tion
              </h3>
              <p className="lead">
                Découvrez notre espace de coworking moderne et innovant, conçu
                pour favoriser la collaboration et la productivité. Que vous
                soyez freelance, entrepreneur ou une petite équipe, nous avons
                l'espace parfait pour vous.
              </p>
            </div>

            {/* Section des avantages */}
            <section className="mb-5">
              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <div className="card shadow-lg h-100">
                    <div className="card-body text-center">
                      <i className="fa fa-wifi fa-2x mb-3 wifi-icon"></i>
                      <h5 className="card-title">Internet Haut Débit</h5>
                      <p className="card-text">
                        Profitez d'une connexion internet rapide et fiable pour
                        tous vos besoins professionnels.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card shadow-lg h-100">
                    <div className="card-body text-center">
                      <i className="fa fa-users fa-2x mb-3 users-icon"></i>
                      <h5 className="card-title">Communauté Dynamique</h5>
                      <p className="card-text">
                        Faites partie d'une communauté de professionnels motivés
                        et innovants.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card shadow-lg h-100">
                    <div className="card-body text-center">
                      <i className="fa fa-coffee fa-2x mb-3 coffee-icon"></i>
                      <h5 className="card-title">Espaces Confortables</h5>
                      <p className="card-text">
                        Travaillez dans des espaces confortables et inspirants,
                        adaptés à vos besoins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr />

            {/* Section des formules d'abonnement */}
            <section className="section" id="pricing">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="title-box text-center">
                      <h3 className="title-heading mt-4">
                        Nos Formules d'Abonnement
                      </h3>
                      <p className="text-muted mt-3 mb-4">
                        Découvrez nos options adaptées à vos besoins, que vous
                        soyez freelance ou entreprise.
                        <br />
                        Choisissez le plan qui vous convient le mieux !
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row mt-2 pt-2">
                  <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
                    <div className="p-4 border shadow-lg w-100 card-hover-effect">
                      <div className="text-center">
                        <div className="icon-circle mb-3">
                          <i className="fa fa-user-clock text-warning"></i>
                        </div>
                        <h4 className="text-center">Temps Partiel</h4>
                        <hr />
                        <ul className="list-inline text-center mt-3 mb-4">
                          <li className="list-inline-item">
                            <i className="fa fa-coffee text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-print text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-wifi text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-plug text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-desktop text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-calendar-alt text-muted me-2"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-2">
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Accès</b> 3 jours par semaine
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Impressions</b> incluses
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Impressions</b> incluses
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Café et thé</b> à volonté
                        </p>
                      </div>
                      <p className="mt-4 pt-2 text-muted text-center">
                        Une option idéale pour les travailleurs à temps partiel.
                      </p>
                      <hr />
                      <div className="text-center">
                        <h4 className="text-muted">
                          <span className="plan pl-3 text-dark">140€</span>
                        </h4>
                        <p className="text-muted mb-0">Par mois</p>
                      </div>
                      <hr />
                      <div className="mt-2 pt-2 text-center">
                        <a
                          href="/contact"
                          className="btn btn-primary btn-rounded"
                        >
                          <i className="fa fa-comment me-2"></i>
                          Nous contacter
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4 align-items-stretch">
                    <div className="p-4 border shadow-lg w-100 card-hover-effect">
                      <div className="text-center">
                        <div className="icon-circle mb-3">
                          <i className="fa fa-user-plus text-success"></i>
                        </div>
                        <h4 className="text-center">Sur Mesure</h4>
                        <hr />
                        <ul className="list-inline text-center mt-3 mb-4">
                          <li className="list-inline-item">
                            <i className="fa fa-coffee text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-print text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-wifi text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-plug text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-desktop text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-calendar-alt text-muted me-2"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-2">
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Personnalisation</b> selon vos besoins
                        </p>
                      </div>
                      <p className="mt-4 pt-2 text-muted text-center">
                        Créez une formule selon vos besoins.
                      </p>

                      <div className="mb-3 text-center">
                        <input
                          type="text"
                          className="form-control text-center"
                          placeholder="Votre numéro de téléphone"
                          id="phoneNumber"
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      <div className="mt-3 text-center">
                        <a
                          href="#"
                          className="btn btn-primary btn-rounded"
                          onClick={sendEmail}
                        >
                          Demander à être rappelé
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
                    <div className="p-4 border shadow-lg w-100 card-hover-effect">
                      <div className="text-center">
                        <div className="icon-circle mb-3">
                          <i className="fa fa-user text-primary"></i>
                        </div>
                        <h4 className="text-center">Plein Temps</h4>
                        <hr />
                        <ul className="list-inline text-center mt-3 mb-4">
                          <li className="list-inline-item">
                            <i className="fa fa-coffee text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-print text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-wifi text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-plug text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-desktop text-muted me-2"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-calendar-alt text-muted me-2"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 pt-2">
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Accès illimité</b> à l'espace
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>7 jours</b> sur 7
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Impressions</b> incluses
                        </p>
                        <p className="mb-2">
                          <i className="fa fa-check-circle text-success me-2"></i>
                          <b>Café et thé</b> à volonté
                        </p>
                      </div>
                      <p className="mt-4 pt-2 text-muted text-center">
                        Accédez à un environnement stimulant pour travailler.
                      </p>
                      <hr />
                      <div className="text-center">
                        <h4 className="text-muted">
                          <span className="plan pl-3 text-dark">199€</span>
                        </h4>
                        <p className="text-muted mb-0">Par mois</p>
                      </div>
                      <hr />
                      <div className="mt-2 pt-2 text-center">
                        <a
                          href="/contact"
                          className="btn btn-primary btn-rounded"
                        >
                          <i className="fa fa-comment me-2"></i>
                          Nous contacter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr />

            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="title-box text-center">
                    <h3 className="title-heading mt-4">
                      Découvrez Nos Espaces
                    </h3>
                    <p className="text-muted mt-3">
                      Nous proposons des espaces de travail flexibles et
                      innovants pour les professionnels de tous horizons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Card />
            </div>
            <br />
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default CoworkingPage;
