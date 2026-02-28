import { createBrowserRouter } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";

import ProtectedLayout from "./components/ProtectedLayout";
import PublicLayout from "./components/PublicLayout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:userId",
        element: <UserEdit />,
        loader: userLoader,
      }
    ],
  },
  {
    path: "*",
    element: <SignIn />, // fallback
  },
]);

export default router;