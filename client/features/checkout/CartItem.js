import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./cartSlice";

const CartItem = (props) => {
  console.log("props.item:", props.item);
  const dispatch = useDispatch();

  if (!props.item || props.item.price === undefined || !props.item.name) {
    return null; // Render nothing if item or item.price is undefined
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div>
      {/* Display the image */}
      <img src={props.item.imageUrl} alt={props.item.name} />

      {/* Display item details */}
      <h3>{props.item.name || "No Name"}</h3>
      <p>Price: ${props.item.price || 0}</p>
      <p>Quantity: {props.item.amount}</p>

      {/* Add to Cart button
      <button onClick={() => handleAddToCart(props.item)}>Add to Cart</button> */}

      {/* Remove from Cart button */}
      {/* <button onClick={() => dispatch(removeFromCart(props.item.id))}>
        Remove from Cart
      </button> */}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    sponsorFee: PropTypes.number,
    amount: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default CartItem;
