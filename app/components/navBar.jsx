"use client";

import components from "./../components";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/img/stationA.png"
            width="45"
            height="45"
            className="d-inline-block me-2"
            alt="Logo de La Station"
          />
          <span className="d-none d-lg-inline me-3">
            La St<strong style={{ color: "orange" }}>A</strong>tion | Rodez
          </span>
        </a>
        {session ? (
          <div className="d-flex align-items-center">
            <span className="text-light small me-3">{session.user.name}</span>
            <img
              className="img-profile rounded-circle"
              src={session.user.profileImage}
              alt="Profile"
              width="30"
              height="30"
            />
            <div className="topbar-divider"></div>
            <components.DropdownButton />
            <div className="topbar-divider d-none d-sm-flex"></div>
            <components.signOutIcon />
            <components.AdminButton />
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <span className="text-white d-none d-lg-block">
              Espace Co-Worker
            </span>
            <div className="topbar-divider d-none d-lg-block"></div>
            <Link href="/api/auth/newUser" passHref>
              <button className="btn btn-outline-light me-2">
                S&apos;inscrire
              </button>
            </Link>
            <Link href="/api/auth/signin" passHref>
              <button className="btn btn-outline-light">Se connecter</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
