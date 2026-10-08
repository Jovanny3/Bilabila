import { Link } from "react-router-dom";

export const Sidebar = () => (
  <aside className="w-64 bg-[#591e00] text-white p-6 space-y-4 min-h-screen">
    <h1 className="text-xl font-bold mb-6">Painel Admin</h1>
    <nav className="flex flex-col gap-2 text-sm">
      <Link
        to="/admin/dashboard"
        className="hover:bg-[#ff5b00] px-3 py-2 rounded transition"
      >
        📊 Dashboard
      </Link>
      <Link
        to="/admin/orders"
        className="hover:bg-[#ff5b00] px-3 py-2 rounded transition"
      >
        🧾 Pedidos
      </Link>
      <Link
        to="/admin/products/list"
        className="hover:bg-[#ff5b00] px-3 py-2 rounded transition"
      >
        🍔 Produtos
      </Link>
      <Link
        to="/admin/users"
        className="hover:bg-[#ff5b00] px-3 py-2 rounded transition"
      >
        👥 Usuários
      </Link>
    </nav>
  </aside>
);
