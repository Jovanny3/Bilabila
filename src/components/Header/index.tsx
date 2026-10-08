import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/BilaBila-Logo_Principal.svg";
const Header = () => {
  const totalProductsInCart = useCartStore((state) => state.totalQuantity());
  const navigate = useNavigate();

  return (
    <>
      {/* Topo com promoção */}
      <div className="bg-[#ff5b00] py-2 w-full text-center">
        <p className="text-white text-sm font-medium font-poppins">
          🎉 20% de desconto em todos os produtos esta semana!
        </p>
      </div>

      {/* Header principal */}
      <header className="bg-white shadow-sm py-4 w-full">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <img src={Logo} className="w-14" />
          {/* Navegação */}
          <nav>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#591e00]">
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/")} // <- redireciona para ProductCard
              >
                Produtos
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/promocoes")}
              >
                Promoções
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/user-orders")}
              >
                Vendas
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/sobre")}
              >
                Sobre
              </li>
              <li>
                {/* Carrinho */}
                <div
                  className="relative cursor-pointer text-[#591e00] hover:text-[#ff5b00] transition"
                  onClick={() => navigate("/cart")}
                >
                  <FaCartArrowDown size={22} />
                  {totalProductsInCart > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ff5b00] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-md">
                      {totalProductsInCart}
                    </span>
                  )}
                </div>
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/login")}
              >
                login
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer transition"
                onClick={() => navigate("/register")}
              >
                Registrar
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };
