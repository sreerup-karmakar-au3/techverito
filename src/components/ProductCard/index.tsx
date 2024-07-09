import React from "react";
import { useLocation } from "react-router-dom";
import HomeFooter from "./HomeFooter";
import CartFooter from "./CartFooter";
import { Product } from "../../common/types";

import "./style.scss";

interface ProductComponentProps {
  productDetails: Product;
  addToCart?: (productDetails: Product) => void;
  removeFromCart?: () => void;
  cartProductQuantityHandler?: (action: string) => void;
}

const ProductsCard: React.FC<ProductComponentProps> = ({
  productDetails,
  addToCart,
  cartProductQuantityHandler,
  removeFromCart,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="product-card">
      <div className="product-details">
        <figure>
          <img src={productDetails.image} className="product-image" />
        </figure>
        <div className="product-highlight">
          <span className="product-title">{productDetails.title}</span>
          <br />
          <span>
            <strong>Price:</strong> {productDetails.price}
          </span>
        </div>
      </div>
      <div className="product-extras">
        {pathname === "/cart" ? (
          <CartFooter
            quantity={productDetails.quantity}
            cartProductQuantityHandler={cartProductQuantityHandler}
            removeFromCart={removeFromCart}
          />
        ) : (
          <HomeFooter
            description={productDetails.description}
            addToCart={() => addToCart?.(productDetails)}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductsCard);
