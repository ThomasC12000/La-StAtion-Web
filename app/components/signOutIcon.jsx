"use client";

import { signOut } from "next-auth/react";

export function signOutIcon() {
  return (
    <button
      className="btn btn-danger d-flex align-items-center d-none d-sm-flex"
      style={{ height: "40px" }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <i className="fas fa-sign-out-alt"></i>
    </button>
  );
}

export default signOutIcon;
