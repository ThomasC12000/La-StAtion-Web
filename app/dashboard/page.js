"use client";

import React from "react";
import components from "../components";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <components.inviteNoAuth />;
  }

  return (
    <>
      <title>La StAtion | Dashboard</title>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1 d-flex align-items-center">
          <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
              <components.ProfileCardImg />
              <components.PersonalInfoCard />
              <components.ChangePasswordCard />
            </div>
          </div>
        </main>
        <components.Footer />
      </div>
    </>
  );
};

export default Dashboard;
