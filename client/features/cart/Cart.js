import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from './store/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems()); // Dispatch an action to fetch cart items
  }, [dispatch]);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
