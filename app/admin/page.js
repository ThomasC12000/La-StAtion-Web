"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import components from "../components";
import AdminPanel from "../components/AdminPanel";
import CodeGenerator from "../components/secretCode";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("adminPanel"); // État pour gérer la section active

  useEffect(() => {
    if (status === "loading") return; // Ne rien faire pendant le chargement
    if (!session) {
      signIn(); // Rediriger vers la page de connexion si non authentifié
    } else if (session.user.role !== "admin") {
      router.push("./unauthorized"); // Rediriger vers la page non autorisée si le rôle n'est pas "admin"
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <p>Loading...</p>;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "userList":
        return <AdminPanel />;
      case "events":
        return <components.publicEventsCalendarCard />;
      case "secretCode":
        return <CodeGenerator />;
      default:
        return <AdminPanel />;
    }
  };

  return (
    <>
      <title>La StAtion | Liste d&apos;utilisateur</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <div className="container mt-5 pt-5">
            {/* Boutons de navigation */}
            <div className="row justify-content-center mb-4">
              <div className="col-12 text-center">
                <button
                  onClick={() => setActiveSection("userList")}
                  className={`btn ${
                    activeSection === "userList"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  } mx-2`}
                >
                  UTILISATEURS
                </button>
                <button
                  onClick={() => setActiveSection("events")}
                  className={`btn ${
                    activeSection === "events"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  } mx-2`}
                >
                  EVENEMENTS
                </button>
                <button
                  onClick={() => setActiveSection("secretCode")}
                  className={`btn ${
                    activeSection === "secretCode"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  } mx-2`}
                >
                  CODE SECRET
                </button>
                {/* Ajoutez plus de boutons pour d'autres sections si nécessaire */}
              </div>
            </div>
            <hr />
            {/* Section active */}
            <div className="row justify-content-center">
              <div className="col-12">{renderActiveSection()}</div>
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default AdminPage;
