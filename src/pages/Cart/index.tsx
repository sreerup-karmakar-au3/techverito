import React, { useEffect, useState } from "react";
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
  const [cartProductModified, setCartProductModified] = useState<Product[]>([]);

  useEffect(() => {
    const product_arr: Product[] = []
    for(let product of cartProducts) {
      if(product.quantity) {
        product_arr.push(product)
      }
    }
    return setCartProductModified(product_arr)
  }, [JSON.stringify(cartProducts)])

  const cartProductQuantityHandler = (
    action: string,
    productId: number
  ): void => {
    const manipulateCartQuantity: Product[] = cartProducts.map((product) => {
      if (product.id === productId) {
        const qty = product.quantity
        
        if (action === CartQuantityEnum.DECREASE && qty === 1)
          return {...product, quantity: 0 }

        product["quantity"] =
          qty && (action === CartQuantityEnum.INCREASE ? qty + 1 : qty - 1);
        
        product["price"] = product["quantity"] * product["originalPrice"];

        if (action === CartQuantityEnum.DECREASE && qty === 1)
          return {...product, quantity: 0 }
      }
      return product
    });

    setCartProducts(manipulateCartQuantity);
  };

  const removeFromCart = (productId: number) => {
    const manipulateCartQuantity: Product[] = cartProducts.filter((product) => product.id !== productId)
    setCartProducts(manipulateCartQuantity);
  }

  const modifyCart = () => {
    return cartProductModified.map((product: Product) => (
      <ProductsCard
        key={product.id}
        productDetails={product}
        cartProductQuantityHandler={(action) =>
          cartProductQuantityHandler(action, product.id)
        }
        removeFromCart={() => removeFromCart(product.id)}
      />
    ))
  }

  if(cartProductModified?.length) {
    return (
      <div className="product-items">
        {modifyCart()}
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