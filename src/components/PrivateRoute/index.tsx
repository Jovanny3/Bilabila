// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import type { ReactNode } from "react";
interface IPrivateRoutes {
  element: ReactNode;
}

const PrivateRoute = ({ element }: IPrivateRoutes) => {
  const { user } = useAuthStore();
  const isAdminLogged = user && user.role == "ADMIN";
  return isAdminLogged ? element : <Navigate to={"/"} />;
};

export { PrivateRoute };
