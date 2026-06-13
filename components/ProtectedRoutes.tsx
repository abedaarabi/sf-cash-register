import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
