import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CartItem from "./CartItem";

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
  const dispatch = useDispatch();

  // const calculateTotal = (items) =>
  //   items.reduce((acc, item) => acc + (item.amount * item.price || 0), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      sponsorFee: PropTypes.number,
      amount: PropTypes.number.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;







// import React from 'react';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import CartItem from "./CartItem";
// // import {  addToCart, removeFromCart } from './cartSlice';


// const Cart = ({cartItems}) => {
//   const dispatch = useDispatch();

//   // const cartItems = [
//   //   {
//   //     id: 1,
//   //     name: 'Ike',
//   //     sponsorFee: 57,
//   //     amount: 3,
//   //     price: 57, // Add the price property
//   //     imageUrl: 'https://picsum.photos/200/300',
//   //     gender: 'Female',
//   //     createdAt: '2023-06-12T05:55:06.131Z',
//   //     updatedAt: '2023-06-12T05:55:06.131Z',
//   //   },
//   // ];

//   const calculateTotal = (items) =>
//     items.reduce((acc, item) => acc + (item.amount * item.price || 0), 0);

//   // const handleAddToCart = (item) => {
//   //   dispatch(addToCart(item));
//   // };
//   // const handleRemoveFromCart = (itemId) => {
//   //   dispatch(removeFromCart(itemId));
//   // };
//   // console.log("cartItems from Cart.js:", cartItems);


//   return (
//     <div>
//       <h2>Your Cart</h2>
//     {cartItems.length === 0 ? (
//         <p>No items in cart.</p>
//     ) : (
//       cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//         />
//       ))
//     )}
//       <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
//     </div>
//   );
// };

// Cart.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string,
//       sponsorFee: PropTypes.number,
//       amount: PropTypes.number.isRequired,
//       imageUrl: PropTypes.string,
//     })
//   ).isRequired,
//   // addToCart: PropTypes.func.isRequired,
//   // removeFromCart: PropTypes.func.isRequired,
// };

// export default Cart;
