import { useRoutes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../Pages/Home";
import { Cart } from "../Pages/Cart";
import { About } from "../Pages/About";
import { Promotions } from "../Pages/Promotions";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { AdminLayout } from "../admin/components/AdminLayout";
import { Dashboard } from "../admin/Pages/Dashboard";
import { Products } from "../admin/Pages/Products";
import { ProductList } from "../admin/Pages/ProductList";
import { Orders } from "../admin/Pages/Orders";
import { Users } from "../admin/Pages/Users";
import { PrivateRoute } from "../components/PrivateRoute";
import { UserOrders } from "../Pages/UserOrders";

export default function Routes() {
  let routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/sobre",
          element: <About />,
        },
        {
          path: "/promocoes",
          element: <Promotions />,
        },
        {
          path: "/user-orders",
          element: <UserOrders />,
        },
      ],
    },
    {
      path: "/admin",
      element: <PrivateRoute element={<AdminLayout />} />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <Products /> },
        {
          path: "products/list",
          element: <ProductList />,
        },
        {
          path: "products/:id",
          element: <Products />, // edição
        },
        {
          path: "products/novo",
          element: <Products />, // cadastro
        },
        { path: "orders", element: <Orders /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);
  return routes;
}
