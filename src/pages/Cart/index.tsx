import React from "react";
import { useOutletContext } from "react-router-dom";
import ProductsCard from "../../components/ProductCard";
import { Product } from "../../common/types";
import { CartQuantityEnum } from "../../utils/constants";

interface CartProductContext {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<any>>;
}

const Cart: React.FC = () => {
  const { cartProducts, setCartProducts } = useOutletContext<CartProductContext>();

  const cartProductQuantityHandler = (
    action: string,
    productId: number
  ): void => {
    const manipulateCartQuantity: Product[] = cartProducts.map((product) => {
      if (product.id === productId) {
        const qty = product["quantity"];
        
        if (action === CartQuantityEnum.DECREASE && qty === 1)
          return product

        product["quantity"] =
          qty && (action === CartQuantityEnum.INCREASE ? qty + 1 : qty - 1);
      }
      return product
    });

    setCartProducts(manipulateCartQuantity);
  };

  const removeFromCart = (productId: number) => {
    const manipulateCartQuantity: Product[] = cartProducts.filter((product) => product.id !== productId)
    setCartProducts(manipulateCartQuantity);
  }

  if(cartProducts?.length) {
    return (
      <div className="product-items">
        {cartProducts.map((product) => (
          <ProductsCard
            key={product.id}
            productDetails={product}
            cartProductQuantityHandler={(action) =>
              cartProductQuantityHandler(action, product.id)
            }
            removeFromCart={() => removeFromCart(product.id)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="empty-cart">
        Nothing in cart!
      </div>
    );
  }

  
}

export default Cart;