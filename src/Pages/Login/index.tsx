// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "react-toastify";
const Login = () => {
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/um-hamburguer-delicioso-com-carne-queijo-tomates-e-alface_1224819-2123.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-2xl p-8 rounded-xl w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-lg text-sm"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 border rounded-lg text-sm"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export { Login };
