import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from "./CartItem";
import { addToCart, removeFromCart, fetchCartItems, updateQuantity } from './cartSlice';
import { useParams } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchCartItems(userId));
  }, [dispatch, userId]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantity(itemId, quantity));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {/* <Cart /> */}
      {cartItems && cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            updateQuantity={handleUpdateQuantity}
          />
        ))
      )}
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};
export default Cart;


















 {/* {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            updateQuantity={handleUpdateQuantity}
          />
        ))
      )}
      <h2>Total: ${totalPrice.toFixed(2)}</h2> */}









// import React, {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import PropTypes from 'prop-types';
// import CartItem from "./CartItem";
// import { addToCart, removeFromCart, fetchCartItems, updateQuantity } from './cartSlice';
// import { useParams } from 'react-router-dom';

//   const Cart = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.items);
//     const totalPrice = useSelector((state) => state.cart.totalPrice);

//     const  {userId } = useParams();
//     useEffect(() => {
//       dispatch(fetchCartItems(userId))
//     }, [dispatch, userId]);
//     console.log("Here at Cart:", fetchCartItems());


//     const handleAddToCart = (item) => {
//       dispatch(addToCart(item));
//     };

//     const handleRemoveFromCart = (itemId) => {
//       dispatch(removeFromCart(itemId));
//     };

//     const handleUpdateQuantity = (itemId, quantity) => {
//       dispatch(updateQuantity(itemId, quantity));
//     };

//     return (
//       <div>
//           <h2>Your Cart</h2>
//       {Array.isArray(cartItems) && cartItems.length === 0 ? (
//         <p>No items in cart.</p>
//       ) : (
//         cartItems.map((item) => (
//           <CartItem
//             key={item.id}
//             item={item}
//             addToCart={handleAddToCart}
//             removeFromCart={handleRemoveFromCart}
//             updateQuantity={handleUpdateQuantity}
//           />
//         ))
//       )}
//       <h2>Total: ${totalPrice.toFixed(2)}</h2>
//       </div>
//     );
//   };

// export default Cart;

  // Cart.propTypes = {
  //   // Add prop types if needed
  //   cartItems: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       id: PropTypes.number.isRequired,
  //       name: PropTypes.string,
  //       sponsorFee: PropTypes.number,
  //       amount: PropTypes.number.isRequired,
  //       imageUrl: PropTypes.string,
  //     })
  //   ).isRequired,
  // };


//Retrieve info from database
//select user
//and show cart items for that user
//create a backend create a get




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
