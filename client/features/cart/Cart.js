import React, { useEffect, useState } from "react";
import { fetchCartItems } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Cart() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [localCart, setLocalCart] = useState([]);

  const theCart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  useEffect(() => {
    const cartItems = localStorage.getItem("local-cart");
    const arrOfCartItems = JSON.parse(cartItems);

    setLocalCart(arrOfCartItems);
    dispatch(fetchCartItems(id));
  }, []);

  return (
    <>
      <ol>
        {isLoggedIn && theCart.length > 0 && theCart[0].products ? (
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
                </div>
                <br />
              </ul>
            );
          })
        ) : (
          <ul>
            {localCart && localCart.length
              ? localCart.map((item, idx) => (
                  <ul key={idx}>
                    <div className="cart-item-container">
                      <li className="list-item">Name: {item.product.name}</li>
                      <li className="list-item">Price: {item.product.price}</li>
                      <li className="list-item">Count: {item.count}</li>
                      <li className="list-item">
                        Total:{item.count * item.product.price}
                      </li>
                    </div>
                  </ul>
                ))
              : null}
          </ul>
        )}
      </ol>
      <button onClick={() => alert("You need to be signed in to checkout")}>
        Checkout
      </button>
    </>
  );
}

export default Cart;
