import React from "react";
import { useCartStore } from "../../stores/cartStore";
import { addSells } from "../../service/calls/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuthStore } from "../../stores/authStore";

const CartSummary = () => {
  const { totalQuantity, products, clearCart } = useCartStore();
  const { signed, user } = useAuthStore();
  const navigate = useNavigate();

  const submitSell = async () => {
    //se não estiver logado não pode comprar
    if (!signed) {
      toast.error("Deves fazer login primeiro antes de finalizar compras");
      navigate("/login");
      return;
    }
    const sellProducts = Array.from(products.entries()).map(([id, item]) => ({
      produtoId: id,
      quantidadeComprada: item.quantity,
    }));

    const data = {
      venda: {
        clienteId: user?.id,
        estado: "progress",
        dataVendaInicio: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        dataVendaFinal: null,
      },
      vendaProdutos: sellProducts,
    };

    try {
      await addSells(data);
      toast.success("Venda feita com sucesso");
      clearCart();
      setTimeout(() => {
        navigate("/user-orders");
      }, 500);
    } catch (error) {
      toast.error("Erro ao finalizar compra.");
    }
  };

  const total = totalQuantity();

  return (
    <div className="w-full sm:w-80 bg-white shadow-md border border-gray-200 rounded-2xl p-6 sticky top-6 self-start font-poppins">
      <h2 className="text-xl font-semibold text-[#591e00] mb-4">
        Resumo do Pedido
      </h2>

      <div className="flex justify-between text-gray-700 mb-2 text-sm">
        <span>Subtotal</span>
        <span>KZ {total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-4 text-sm">
        <span>Frete</span>
        <span className="text-green-600 font-medium">Grátis</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-bold text-[#591e00]">
        <span>Total</span>
        <span>KZ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={submitSell}
        className="mt-6 w-full bg-[#ff5b00] hover:bg-[#e35300] transition text-white font-semibold py-2 rounded-xl"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export { CartSummary };
