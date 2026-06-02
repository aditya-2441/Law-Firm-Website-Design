import { createBrowserRouter } from "react-router";
import { ClientLanding } from "./pages/ClientLanding";
import { LawyerDashboard } from "./pages/LawyerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Conversations } from "./pages/Conversations";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/client",
    Component: ClientLanding,
  },
  {
    path: "/lawyer",
    Component: LawyerDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/conversations",
    Component: Conversations,
  },
]);
