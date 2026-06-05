import { createBrowserRouter } from "react-router";
import { ClientDashboard } from "./pages/ClientDashboard";
import { LawyerDashboard } from "./pages/LawyerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Conversations } from "./pages/Conversations";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { LawyerLanding } from "./pages/LawyerLanding";

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
    path: "/lawyer",
    element: <LawyerLanding />,
  },
  {
    path: "/lawyer/dashboard",
    element: <LawyerDashboard />,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  // Inside your routes array:
  {
    path: "/conversations",
    element: <Conversations />,
  },
  {
  path: "/client",
  element: <ClientDashboard />,
},
]);
