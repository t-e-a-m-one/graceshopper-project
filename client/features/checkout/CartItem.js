import React, { useState } from 'react';
import PropTypes from 'prop-types';


const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.item.amount); // Initialize the quantity state with the initial item amount


  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10); // Parse the input value to an integer
    setQuantity(newQuantity); // Update the quantity state
    props.updateQuantity(props.item.id, newQuantity); // Call the updateQuantity function passed from the Cart component
  };

  if (!props.item || props.item.price === undefined || !props.item.name) {
    return null; // Render nothing if item or item.price is undefined
  }

  return (
    <div>
      {/* Display the image */}
      <img src={props.item.imageUrl} alt={props.item.name} />

      {/* Display item details */}
      <h3>{props.item.name || 'No Name'}</h3>
      <p>Price: ${props.item.price || 0}</p>

      {/* Quantity input field */}
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={handleQuantityChange}
        />
      </label>

      {/* Add to Cart button */}
      <button onClick={() => props.addToCart(props.item)}>Add to Cart</button>

      {/* Remove from Cart button */}
      <button onClick={() => props.removeFromCart(props.item.id)}>
        Remove from Cart
      </button>
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
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};


export default CartItem;













// import React from 'react';
// import PropTypes from 'prop-types';
// import { addToCart, removeFromCart } from './cartSlice';

// const CartItem = (props) => {
//   console.log('props.item:', props.item);


//   if (!props.item || props.item.price === undefined || !props.item.name) {
//     return null; // Render nothing if item or item.price is undefined
//   }

//   return (
//     <div>
//        {/* Display the image */}
//        <img src={props.item.imageUrl} alt={props.item.name} />

//       {/* Display item details */}
//       <h3>{props.item.name || "No Name"}</h3>
//       <p>Price: ${props.item.price || 0}</p>
//       <p>Quantity: {props.item.amount}</p>
// {/* Add to Cart button */}
//       <button onClick={() => dispatch(addToCart(props.item))}>Add to Cart</button>
// {/* Remove from Cart button */}
//       <button onClick={() => dispatch(removeFromCart(props.item.id))}>
//       Remove from Cart
//       </button>
//     </div>
//   );
// };

// CartItem.propTypes = {
//   item: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string,
//     sponsorFee: PropTypes.number,
//     amount: PropTypes.number.isRequired,
//     imageUrl: PropTypes.string,
//   }).isRequired,
// };

// export default CartItem;


