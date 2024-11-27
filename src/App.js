import { useEffect, useState } from 'react';
import styled from "styled-components";
import Cart from "./components/Cart";
import Products from "./components/Products";

/**
 *  Função para chamar uma API
 *  @param {string} url Caminho da função
 *  @param {string} method Método da função
 *  @param {any} body Corpo da requisição
 *  @returns
 */
async function api(url, method, body) {
  return await fetch(`http://localhost:4000${url}`, {
    body: body !== undefined ? JSON.stringify(body) : body,
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

/**
 *  Busca todos os produtos da API
 * @returns lista de produtos
 */
async function apiGetProducts() {
  const data = await api('/products', 'GET');
  return data.products;
}

/**
 *  Salva o carrinho de compras na API
 *  @param {Object[]} products Lista de produtos
 */
async function apiSubmitCart(products) {

  //console.log(products);
  await api('/purchases', 'POST', {products});
}

function App() {
  const [productsLoading, setProductsLoading] = useState(false); // Status de carregamento dos produtos
  const [products, setProducts] = useState([]); // Lista de produtos
  const [cart, setCart] = useState([]); // Lista de produtos no carrinho
  const [cartLoading, setCartLoading] = useState(false); // Status de carregamento do carrinho

  // Busca os produtos
  async function getProducts() {
    setProductsLoading(true); // Ativa loading de produtos
    setProducts(await apiGetProducts()); // Salva lista de produtos na variável global
    setProductsLoading(false); // Desativa loading de produtos
  }

  // Salva o carrinho
  async function submitCart() {
    setCartLoading(true);
    try {
      // Envia os produtos do carrinho para a API
      await apiSubmitCart(cart);
      setCart([]); // Limpa o carrinho
      setCartLoading(false);
      getProducts(); // Atualiza os produtos disponíveis após a compra
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      setCartLoading(false);
    }
  }


  // Altera unidades do produto
  function setProduct(product, change) {
    const products = cart.filter(({ id }) => {
      return id !== product.id;
    });

    product.units += change;
    if (product.units > 0) {
      setCart(() => [...products, product]);
    } else {
      setCart(() => [...products]);
      setProducts((LastProducts) => [...LastProducts, product])
    }
  }

  // Adiciona produto no carrinho
  function addProduct(product) {
    product.units = 1;

    // Atualiza o carrinho com o novo produto
    setCart((prevCart) => [...prevCart, product]);

    // Atualiza o estado dos produtos, marcando o produto como 'inCart'
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, inCart: true } : p
      )
    );
  }


  useEffect(() => {
    getProducts(); // Busca os produtos ao carregar a página
  }, []);



  const SMain = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  `;

  return (
    <SMain>
      <Cart
        products={cart}
        onChange={setProduct}
        onClick={submitCart}
        isLoading={cartLoading}
      />
      <Products
        products={products}
        onClick={addProduct}
        isLoading={productsLoading}
      />
    </SMain>
  );


}

export default App;
