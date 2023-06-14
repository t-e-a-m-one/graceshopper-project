import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, selectCartItems } from "./cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (dogId) => {
    dispatch(removeFromCart(dogId));
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.dogId}>
              {item.name} - ${item.price}
              <button onClick={() => handleRemoveFromCart(item.dogId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
