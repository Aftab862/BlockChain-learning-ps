"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const publicPaths = ["/login", "/signup"];

    if (publicPaths.includes(pathname)) {
      setAuthenticated(true);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("auth-token");

    if (!token) {
      router.push("/login");
    } else {
      // Optionally: call backend to verify token here
      setAuthenticated(true);
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return null;

  return <>{children}</>;
}
