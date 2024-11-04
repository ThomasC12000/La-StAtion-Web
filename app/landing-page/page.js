"use client";

import React from "react";
import components from "../components";

const LandingPage = () => {
  return (
    <>
      <title>La StAtion</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <div className="container mt-5 pt-5">
            {/* Section d'introduction */}
            <section className="text-center mb-5">
              <h1 className="display-4">
                Bienvenue à La St<strong style={{ color: "orange" }}>A</strong>
                tion
              </h1>
              <p className="lead">
                Un espace de coworking innovant au cœur de la ville
              </p>
            </section>

            {/* Section avec image et explications */}
            <section className="row align-items-center mb-5">
              <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
                <h3>Un endroit idéal pour travailler et se détendre !</h3>
                <br />
                <p>
                  La StAtion offre un environnement unique où particulier et
                  professionnels peuvent collaborer, créer et se détendre. Nos
                  espaces de travail sont conçus pour maximiser la productivité
                  et le bien-être de nos membres.
                </p>
                <p>
                  Rejoignez-nous pour découvrir un lieu où innovation et
                  convivialité se rencontrent.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <img
                  src="/img/co_working/espacedetente.jpg"
                  className="img-fluid rounded-4 shadow-lg"
                  alt="Espace détente"
                />
              </div>
            </section>

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

            {/* Section profil */}
            <section className="d-flex align-items-center my-5">
              <div className="me-4">
                <img
                  src="/img/AlanHay.jpg"
                  className="rounded-circle shadow-lg"
                  alt="Profil"
                  width="150"
                  height="150"
                />
              </div>
              <div>
                <center>
                  <h4>Alan Hay</h4>
                  <p>
                    Directeur général de La St
                    <strong style={{ color: "orange" }}>A</strong>
                    tion
                  </p>
                  <p>
                    Passionné par l’innovation et le développement des
                    communautés professionnelles, il occupe un rôle clé chez La
                    StAtion, où il contribue à l’établissement d’un
                    environnement favorable à la collaboration et à la
                    croissance. Son engagement et sa vision stratégique
                    favorisent l’épanouissement des initiatives collectives et
                    renforcent les synergies au sein de la communauté.
                  </p>
                </center>
              </div>
            </section>
            <hr />
            <br />
            <div class="container">
              <div class="row text-center justify-content-center mb-5">
                <div class="col-xl-6 col-lg-8">
                  <h2 class="font-weight-bold">
                    Comment a évolué La St
                    <strong style={{ color: "orange" }}>A</strong>tion ?
                  </h2>
                  <p class="text-muted">
                    Nous sommes très fiers du chemin que nous avons parcouru.
                    Découvrez l'histoire qui a fait de nous l'entreprise que
                    nous sommes aujourd'hui.
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="timeline-steps" data-aos="fade-up">
                    <div class="timeline-step">
                      <div
                        class="timeline-content"
                        data-toggle="popover"
                        data-trigger="hover"
                        data-placement="top"
                        title="2003"
                        data-content="Et voici un contenu incroyable. C'est très engageant. N'est-ce pas ?"
                      >
                        <div class="inner-circle"></div>
                        <p class="h6 mt-3 mb-1">2017</p>
                        <p class="h6 text-muted mb-0 mb-lg-0">
                          Début de l'aventure
                        </p>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div
                        class="timeline-content"
                        data-toggle="popover"
                        data-trigger="hover"
                        data-placement="top"
                        title="2004"
                        data-content="Et voici un contenu incroyable. C'est très engageant. N'est-ce pas ?"
                      >
                        <div class="inner-circle"></div>
                        <p class="h6 mt-3 mb-1">2020</p>
                        <p class="h6 text-muted mb-0 mb-lg-0">
                          Ouverture de Station A
                        </p>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div
                        class="timeline-content"
                        data-toggle="popover"
                        data-trigger="hover"
                        data-placement="top"
                        title="2005"
                        data-content="Et voici un contenu incroyable. C'est très engageant. N'est-ce pas ?"
                      >
                        <div class="inner-circle"></div>
                        <p class="h6 mt-3 mb-1">2021</p>
                        <p class="h6 text-muted mb-0 mb-lg-0">
                          Transformation en SCIC
                        </p>
                      </div>
                    </div>
                    <div class="timeline-step">
                      <div
                        class="timeline-content"
                        data-toggle="popover"
                        data-trigger="hover"
                        data-placement="top"
                        title="2010"
                        data-content="Et voici un contenu incroyable. C'est très engageant. N'est-ce pas ?"
                      >
                        <div class="inner-circle"></div>
                        <p class="h6 mt-3 mb-1">2023</p>
                        <p class="h6 text-muted mb-0 mb-lg-0">
                          Ouverture de La St
                          <strong style={{ color: "orange" }}>A</strong>tion
                        </p>
                      </div>
                    </div>
                    <div class="timeline-step mb-0">
                      <div
                        class="timeline-content"
                        data-toggle="popover"
                        data-trigger="hover"
                        data-placement="top"
                        title="2020"
                        data-content="Et voici un contenu incroyable. C'est très engageant. N'est-ce pas ?"
                      >
                        <div class="inner-circle"></div>
                        <p class="h6 mt-3 mb-1">2024</p>
                        <p class="h6 text-muted mb-0 mb-lg-0">
                          Beaucoup plus à venir...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          {/* Section newsletter */}
          <section className="bg-light py-5">
            <div className="text-center mb-4">
              <h5 className="card-title">Inscrivez-vous à notre newsletter</h5>
            </div>
            <form className="d-flex justify-content-center">
              <div className="input-group w-50 rounded-5">
                <input
                  type="email"
                  className="form-control rounded-start-5"
                  id="email"
                  placeholder="Entrez votre e-mail"
                  required
                />
                <button type="submit" className="btn btn-primary rounded-end-5">
                  S'inscrire
                </button>
              </div>
            </form>
          </section>
        </main>
        <components.footerMain />
      </div>
    </>
  );
};

export default LandingPage;
