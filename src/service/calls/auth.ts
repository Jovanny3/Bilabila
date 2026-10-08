import { api } from "../api";

const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
      username: email.split("@")[0],
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Falha ao fazer login. Verifique suas credenciais.");
  }
};

export { login };
