import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { addToCart, removeFromCart, selectCartItems } from "./cartSlice";
import { Link } from "react-router-dom";
import { createOrder } from "./cartSlice";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + (item.amount * item.sponsorFee || 0), 0);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleCheckout = () => {
    cartItems.forEach((item) => {
      dispatch(createOrder({ item }));
    });
  };

  return (
    <div id="tocart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        ))
      )}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Link to="/cart/checkout">
        <button onClick={handleCheckout}>Go to Checkout</button>
      </Link>
    </div>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
