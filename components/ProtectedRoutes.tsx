import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { user } = useAuth();

  React.useEffect(() => {
    !user && router.push("/login");
  }, [router, user]);

  return <div>{user && children}</div>;
}
