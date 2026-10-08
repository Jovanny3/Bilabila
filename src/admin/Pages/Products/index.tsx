import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type Categoria = {
  id: number;
  categoria: string;
};

const Products = () => {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [img, setImg] = useState("");

  const [categoriaId, setCategoriaId] = useState<number>(1);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    // Buscar categorias disponíveis
    fetch(
      "https://ecommer-api-bilabila-deploy-render.onrender.com/api/categorias"
    )
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
        alert("Erro ao carregar categorias.");
      });
  }, []);

  useEffect(() => {
    if (id) {
      fetch(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos/${id}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar produto");
          return res.json();
        })
        .then((produto) => {
          setNome(produto.nome);
          setPreco(produto.preco);
          setEstoque(produto.estoque);
          setImg(produto.img);
          setCategoriaId(produto.categoria.id);
        })
        .catch((err) => {
          console.error("Erro ao carregar produto:", err);
          alert("Não foi possível carregar o produto.");
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoriaSelecionada = categorias.find(
      (cat) => cat.id === categoriaId
    );
    if (!categoriaSelecionada) {
      alert("Categoria inválida.");
      return;
    }

    const produto = {
      nome: nome.trim(),
      preco,
      img: img.trim(),
      categoria: {
        id: categoriaSelecionada.id,
        categoria: categoriaSelecionada.categoria,
      },
      estoque,
    };

    try {
      const response = await fetch(
        "https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produto),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro detalhado:", errorData);
        throw new Error("Erro ao salvar o produto");
      }

      const data = await response.json();
      console.log("Produto salvo:", data);
      alert("Produto salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
      alert("Erro ao salvar o produto.");
    }
  };

  return (
    <div className="mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Editar Produto" : "Cadastrar Produto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Preço (Kz)"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(Number(e.target.value))}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoria}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {id ? "Salvar Alterações" : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
};

export { Products };
