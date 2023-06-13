import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { selectCartItems, addToCart, removeFromCart } from "./cartSlice";
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = [
    {
      id: 1,
      name: "Ike",
      sponsorFee: 57,
      amount: 3,
      price: 57, // Add the price property
      imageUrl: "https://picsum.photos/200/300",
      gender: "Female",
      createdAt: "2023-06-12T05:55:06.131Z",
      updatedAt: "2023-06-12T05:55:06.131Z",
    },
  ];

  const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + (item.amount * item.price || 0), 0);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };
  console.log("cartItems from Cart.js:", cartItems);

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
        <button>Go to Checkout</button>
      </Link>
    </div>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;
