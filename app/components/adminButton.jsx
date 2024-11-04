import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminButton() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  if (userRole !== "admin") {
    return null;
  }

  return (
    <Link href="/admin" passHref>
      <button className="btn btn-primary ms-3 d-none d-sm-flex">ADMIN</button>
    </Link>
  );
}
