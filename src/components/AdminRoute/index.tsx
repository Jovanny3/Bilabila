// src/components/AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const isAdmin = () => {
  const user = localStorage.getItem("user");
  try {
    const parsed = JSON.parse(user || "{}");
    return parsed?.tipo === "admin";
  } catch {
    return false;
  }
};

const AdminRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to="/login" />;
};

export { AdminRoute };
