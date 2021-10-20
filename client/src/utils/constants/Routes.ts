import { Login } from "@modules/Auth/Login";
import { Register } from "@modules/Auth/Register";
import { ResetPassword } from "@modules/Auth/ResetPassword";
import { Reset } from "@modules/Auth/Reset";
//
import { UserPage } from "@modules/User/UsersPage";

import { AuthRoutes, ProtectedRoutes } from "@utils/enums/routes";

// Main components
export const protectedRoutes = [
  {
    path: ProtectedRoutes.DASHBOARD,
    component: UserPage,
    title: "Dashboard",
  },
  {
    path: ProtectedRoutes.USERS,
    component: UserPage,
    title: "Users",
  },
  {
    path: ProtectedRoutes.PAGES,
    component: UserPage,
    title: "Pages",
  },
  {
    path: ProtectedRoutes.MODULES,
    component: UserPage,
    title: "Modules",
  },
  {
    path: ProtectedRoutes.GROUPS,
    component: UserPage,
    title: "Groups",
  },
  {
    path: ProtectedRoutes.NEWSLETTER,
    component: UserPage,
    title: "Newsletter",
  },
  {
    path: ProtectedRoutes.WEBSHOP,
    component: UserPage,
    title: "Webshop",
  },
  {
    path: ProtectedRoutes.SETTINGS,
    component: UserPage,
    title: "Settings",
  },
];

// Auth components
export const routes = [
  { path: AuthRoutes.LOGIN, component: Login },
  { path: AuthRoutes.REGISTER, component: Register },
  { path: AuthRoutes.RESET, component: Reset },
  { path: AuthRoutes.RESET_PASSWORD, component: ResetPassword },
];
