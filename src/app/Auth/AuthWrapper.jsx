// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { isRouteAccessible, ROUTES } from "@/utils/routes";

// export default function AuthWrapper({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [hasAccess, setHasAccess] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("auth-token");
//     const role = localStorage.getItem("user-role"); // "user" or "admin"

//     const isPublicRoute = ROUTES.public.includes(pathname);

//     // 1. Public Route Logic (guest only)
//     if (isPublicRoute) {
//       if (token && role) {
//         const redirectTo = role === "admin" ? "/admin" : "/";
//         router.replace(redirectTo);
//         // Don't update loading or access state, just exit early
//         return;
//       } else {
//         setHasAccess(true); // allow guest to see public page
//         setLoading(false);
//         return;
//       }
//     }

//     // 2. Private Route: no token or role = force login
//     if (!token || !role) {
//       router.replace("/Auth/login");
//       // Exit early so no state updates trigger children render
//       return;
//     }

//     // 3. Role-Based Access
//     const routeIsAccessible = isRouteAccessible(pathname, role);
//     if (!routeIsAccessible) {
//       router.replace("/unauthorized");
//       return;
//     }

//     // 4. Allowed
//     setHasAccess(true);
//     setLoading(false);
//   }, [pathname, router]);

//   if (loading) return <div>Loading...</div>;
//   if (!hasAccess) return null; // block render until access is confirmed

//   return <>{children}</>;
// }
