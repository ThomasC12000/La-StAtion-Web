import { getSession } from "next-auth/react";

export const checkAuth = async () => {
  const session = await getSession();
  return session;
};
