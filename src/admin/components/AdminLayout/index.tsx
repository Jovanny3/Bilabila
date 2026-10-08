import { Outlet, Link } from "react-router-dom";
import { Sidebar } from "../Siderbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-orange-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel Administrativo</h1>
        <nav className="space-x-4">
          <Link to="/admin" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/" className="hover:underline">
            Loja
          </Link>
          <Link to="/admin/products" className="hover:underline">
            Adicionar produtos
          </Link>
        </nav>
      </header>

      <main className="p-6 flex">
        <Sidebar />
        <div className="w-full ml-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export { AdminLayout };
