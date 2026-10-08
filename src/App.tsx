import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";
import SplashLoader from "./components/SplashLoader";
function App() {
  const { loadStorageData, splashLoading } = useAuthStore();
  //Carregar os dados de verificação de usuário antes de iniciar a aplicação
  useEffect(() => {
    loadStorageData();
  }, []);
  return (
    <>
      {splashLoading ? (
        <SplashLoader />
      ) : (
        <BrowserRouter>
          <Routes />
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
