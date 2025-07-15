"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const publicPaths = ["/Auth/login", "/Auth/signup"];
    const privatePaths = ["/users", "/create-user" , "/"];
    const protectedPaths = ["/admin/user-listing"];

    const token = localStorage.getItem("auth-token");
    const userRole = localStorage.getItem("user-role") || "user";
    // If user is logged in and tries to access public paths, redirect away
    if (token && publicPaths.includes(pathname)) {
      router.push("/"); // or wherever logged-in users should go
      setLoading(false);
      return;
    }

    // Allow public paths if no token
    if (publicPaths.includes(pathname)) {
      setAuthenticated(false); // not logged in
      setHasAccess(true);
      setLoading(false);
      return;
    }

    // For private/protected routes, check token
    if (!token) {
      router.push("/Auth/login");
      setLoading(false);
      return;
    }

    setAuthenticated(true);

    // Role-based access control
    if (privatePaths.includes(pathname)) {
      setHasAccess(true);
    } else if (protectedPaths.includes(pathname)) {
      if (userRole === "admin") {
        setHasAccess(true);
      } else {
        router.push("/");
        setLoading(false);
        return;
      }
    } else {
      // fallback access control - allow by default or customize here
      setHasAccess(true);
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading) return <div>Loading...</div>;

  if (!hasAccess) return null;

  return <>{children}</>;
}