import { Login } from "@modules/Auth/Login";
import { Register } from "@modules/Auth/Register";
import { ResetPassword } from "@modules/Auth/ResetPassword";
import { Reset } from "@modules/Auth/Reset";
//
import { UserPage } from "@modules/User/UsersPage";

// Main components
export const protectedRoutes = [
  {
    path: "/",
    component: UserPage,
    title: "Dashboard",
  },
  {
    path: "/users/list",
    component: UserPage,
    title: "Users",
  },
  {
    path: "/pages/list",
    component: UserPage,
    title: "Pages",
  },
  {
    path: "/modules/list",
    component: UserPage,
    title: "Modules",
  },
  {
    path: "/groups/list",
    component: UserPage,
    title: "Groups",
  },
  {
    path: "/newsletter/list",
    component: UserPage,
    title: "Newsletter",
  },
  {
    path: "/webshop/list",
    component: UserPage,
    title: "Webshop",
  },
  {
    path: "/settings/list",
    component: UserPage,
    title: "Settings",
  },
];

// Auth components
export const routes = [
  { path: "/auth/login", component: Login },
  { path: "/auth/register", component: Register },
  { path: "/auth/reset", component: Reset },
  { path: "/auth/resetPassword/:token", component: ResetPassword },
];
