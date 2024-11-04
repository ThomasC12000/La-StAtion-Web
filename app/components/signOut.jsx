"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="dropdown-item text-light"
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <i className="fa fa-sign-out me-2" aria-hidden="true"></i> Se déconnecter
    </button>
  );
}

export default SignOut;
