import { useEffect, useState } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://ecommer-api-bilabila-deploy-render.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuários</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.tipo || "cliente"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
