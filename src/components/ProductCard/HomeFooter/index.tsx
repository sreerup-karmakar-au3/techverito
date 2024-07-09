import React from "react";

import "./style.scss"

interface HomeFooterProps {
  description: string;
  addToCart?: () => void
}

const HomeFooter: React.FC<HomeFooterProps> = ({ description, addToCart }) => {

  return (
    <>
      <p className="product-description">{description}</p>
      <p className="add-to-cart">
        <button onClick={addToCart}>Add to Cart</button>
      </p>
    </>
  );
};

export default HomeFooter;