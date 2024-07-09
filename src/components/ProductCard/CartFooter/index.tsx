import React from "react";
import { CartQuantityEnum } from "../../../utils/constants";

import "./style.scss"

interface CartFooterProps {
  quantity: number | undefined;
  cartProductQuantityHandler: ((action: string) => void) | undefined;
  removeFromCart: (() => void) | undefined
}

const CartFooter: React.FC<CartFooterProps> = ({ quantity, cartProductQuantityHandler, removeFromCart }) => {
  return (
    <>
      <p className="remove-btn">
        <button onClick={removeFromCart}>Remove</button>
      </p>
      <p className="quantity-control">
        <button onClick={() => cartProductQuantityHandler?.(CartQuantityEnum.DECREASE)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => cartProductQuantityHandler?.(CartQuantityEnum.INCREASE)}>+</button>
      </p>
    </>
  );
};

export default CartFooter;