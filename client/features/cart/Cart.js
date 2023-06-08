import React, { useEffect } from "react";
import { fetchCartItems, removeCartItemAsync } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Cart() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const theCart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    dispatch(fetchCartItems(id));
  }, [dispatch, id]);

  const handleRemoveFromCart = (dogId) => {
    if (isLoggedIn) {
      dispatch(removeCartItemAsync({ dogId, userId: id }));
    }
  };

  return (
    <>
      <ol>
        {isLoggedIn && theCart && theCart.length > 0 && theCart[0].products ? (
          theCart[0].products.map((singleItem, index) => {
            return (
              <ul key={index}>
                <div className="cart-item-container">
                  <li className="list-item">Name: {singleItem.name}</li>
                  <li className="list-item">Price: {singleItem.price}</li>
                  <li className="list-item">
                    Quantity Desired: {singleItem.cartItems.quantity}
                  </li>
                  <li className="list-item">
                    Price: {singleItem.cartItems.quantity * singleItem.price}
                  </li>
                  <button onClick={() => handleRemoveFromCart(singleItem.id)}>
                    Remove from Cart
                  </button>
                </div>
                <br />
              </ul>
            );
          })
        ) : (
          <ul>
            {theCart && theCart.length > 0
              ? theCart.map((item, idx) => (
                  <ul key={idx}>
                    <div className="cart-item-container">
                      <li className="list-item">Name: {item.name}</li>
                      <li className="list-item">Price: {item.price}</li>
                      <li className="list-item">
                        Count: {item.cartItems.quantity}
                      </li>
                      <li className="list-item">
                        Total: {item.cartItems.quantity * item.price}
                      </li>
                      <button onClick={() => handleRemoveFromCart(item.id)}>
                        Remove from Cart
                      </button>
                    </div>
                  </ul>
                ))
              : null}
          </ul>
        )}
      </ol>
      <button onClick={() => alert("You need to be logged in.")}>
        Checkout
      </button>
    </>
  );
}

export default Cart;
