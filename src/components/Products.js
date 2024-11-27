import styled from "styled-components";

// Elemento de bloco personalizado com CSS
const SDiv = styled.div`
  height: 300px;
  padding: 10px;
  border-radius: 20px;
  background: #f2f2f2;
  cursor: pointer;

  img {
    width: 50%;
    height: 70%;
    border-radius: 5px;
  }
`;

// Elemento de bloco com estilos para informações
const SDivInfo = styled.div`
  padding: 15px;

  p {
    font-size: 15px;
  }
    span{
    font-size: 20px;
    font-weight: bold;
    }
`;

/**
 * Componente para listagem de produto
* @param {Object} product Produto para listagem
* @param {Function} onClick Função de seleção
*/
function Product({ product, onClick }) {
  return (
    <SDiv onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} />
      <SDivInfo>
        <p>{product.name}</p>
        <span>R${product.price}</span>
      </SDivInfo>
    </SDiv>
  );
}

// Elemento de seção para container
const SSection = styled.section`
  overflow: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Duas colunas fixas */
  grid-auto-rows: 300px; /* Altura fixa para cada linha */
  gap: 20px; /* Espaçamento entre os elementos */
`;


/**
 *  Componente para listagem de produtos
 *  @param {Object[]} products Produtos para listagem
 *  @param {Function} onClick Função de seleção
 */
function Products({ products, onClick, isLoading = false }) {
  return (
    <SSection>
      {isLoading // Verifica se está em loading
        ? "Carregando..."
        : products.length > 0 // Verifica se existem produtos
          ? products.map((product) => (
            <Product key={product.id} product={product} onClick={onClick} />
          ))
          : "Nenhum produto encontrado!"}
    </SSection>
  );
}

export default Products;

