import { Navigate, Outlet } from "react-router-dom";

export default function PublicLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/users" replace />;
  }

  return <Outlet />;
}