import styled from "styled-components";
import Button from "./Button";

const SLi = styled.li`
margin-bottom:10px;
padding: 16px;
border-radius: 8px;
background: #f2f2f2;
display: flex;
justify-content: space-between;
align-items: center;
`;

// Elemento do bloco de informações da pessoa
const SDivInfo = styled.div`
  p {
    font-size: 16px;
    margin-bottom: 2px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

// Elemento de bloco de unidades perso-tel
const SDivUnits = styled.div`
  width: 70px;
  display: flex;
  justify-content: space-between; 
  align-items: center;

  button {
    padding: 5px 10px;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

/**
 * componente para listagem de produto no carrinho
 * @param {Object} product
 
 */
function CartProduct({ product, onChange, isLoading }) {
  return (
    <SLi>
      <SDivInfo>
        <p>{product.name}</p>
        <span>R${product.price}</span>
      </SDivInfo>
      <SDivUnits>
        <button disabled={isLoading} onClick={() => onChange(product, -1)}>
          -
        </button>
        <p>{product.units}</p>
        <button disabled={isLoading} onClick={() => onChange(product, +1)}>
          +
        </button>
      </SDivUnits>
    </SLi>
  );
}



const SSection = styled.section`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: 1fr 50px;
  gap: 20px;
`;

const SUl = styled.ul`
  list-style-type: none;
`;

/**
 * Component for listing products in the cart
 * @param {Object[]} products - Products to list
 * @param {Function} onClick - Function to handle changes
 * @param {Boolean} isLoading - Status of loading
 */
function Cart({ products, onChange, onClick, isLoading = false }) {
  // Calcula o total da compra
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.units;
  }, 0);

  return (
    <SSection>
      <SUl>
        {products.map((product) => (
          <CartProduct
            key={product.id}
            product={product}
            onChange={onChange}
            isLoading={isLoading}
          />
        ))}
      </SUl>
      {/* Exibindo o total da compra */}
      <div>
        <p>
          <strong>Total:</strong> R${totalPrice.toFixed(2)}
        </p>
      </div>
      <Button onClick={onClick} isLoading={isLoading}>
        Finalizar compra
      </Button>
    </SSection>
  );
}

export default Cart;
