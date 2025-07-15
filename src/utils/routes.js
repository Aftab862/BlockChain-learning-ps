// utils/routes.js

export const ROUTES = {
  PUBLIC_ROUTES: [
    "/Auth/login",
    "/Auth/signup",
    "/about",
    "/contact",
  ],
  USER_ROUTES: [
    "/",
    "/Users",
    "/User/create-user",
    "/User/edit-user", // base path only — leave out ":id"
  ],
  ADMIN_ROUTES: [
    "/admin",
    "/admin/user-listing",
    "/admin/create-user",
    "/admin/settings",
  ],
};

export function getRoutesByRole(role) {
  if (role === "admin") return ROUTES.admin;
  if (role === "user") return ROUTES.user;
  return [];
}

export function isRouteAccessible(path, role) {
  const allowedRoutes = getRoutesByRole(role);
  return allowedRoutes.some((route) => {
    return path === route || path.startsWith(route + "/");
  });
}
