// src/pages/admin/Orders.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
export const UserOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("todos");
  const [clienteFiltro, setClienteFiltro] = useState("");
  const { user } = useAuthStore();
  useEffect(() => {
    if (user != null) {
      const { id } = user;
      axios
        .get(
          `https://ecommer-api-bilabila-deploy-render.onrender.com/api/vendas/user/${id}`
        )
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Erro ao buscar vendas:", err));
    }
  }, [user]);

  const filtrar = () => {
    return orders.filter((v) => {
      const estadoMatch = filtro === "todos" || v.estado === filtro;
      const clienteMatch =
        clienteFiltro === "" || v.clienteId.toString() === clienteFiltro;
      return estadoMatch && clienteMatch;
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f9f7f5]">
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6 text-[#591e00]">📦 Pedidos</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border p-2 rounded w-[180px]"
          >
            <option value="todos">Todos</option>
            <option value="progress">Em progresso</option>
            <option value="ready">Pronto</option>
            <option value="completed">Concluído</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#ffede2] text-[#591e00]">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Pagamento</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrar().map((venda) => (
                <>
                  <tr key={venda.id} className="border-t hover:bg-[#fff9f5]">
                    <td className="p-3">#{venda.id}</td>
                    <td className="p-3">Cliente {venda.clienteId}</td>
                    <td className="p-3">{venda.estado}</td>
                    <td className="p-3">
                      {new Date(venda.dataVendaInicio).toLocaleString()}
                    </td>
                    <td className="p-3">{venda.transacao?.estado || "-"}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-3 text-sm">
                      <p className="font-semibold mb-2 text-gray-700">
                        Produtos:
                      </p>
                      <ul className="ml-4 list-disc text-gray-600">
                        {venda.produtos.map((p: any) => (
                          <li key={p.produtoId}>
                            Produto #{p.produtoId} &nbsp; x
                            {p.quantidadeComprada}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-gray-600">
                        💳 Tipo Pagamento ID: {venda.transacao?.tipoPagamentoId}
                      </p>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
