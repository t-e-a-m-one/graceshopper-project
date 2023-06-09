import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchCartAsync,
  addCartItemAsync,
  updateCartItemQuantityAsync,
  removeCartItemAsync,
} from "./cartSlice";
import {
  updateOrderItemQuantityAsync,
  removeOrderItemAsync,
} from "./orderItemSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCartAsync(user.id));
    }
  }, [dispatch, user]);

  const cart = useSelector((state) => state.cart.data);
  const orderItem = useSelector((state) => state.orderItem.data);

  const [qty, setQty] = useState(1);

  const handleUpdateQuantity = (orderItemId, prodPrice) => {
    const reqBody = { qty, prodPrice };
    dispatch(
      updateOrderItemQuantityAsync({
        userId: user.id,
        cartItemId: orderItemId,
        quantity: qty,
      })
    );
  };

  const handleDelete = (orderItemId) => {
    dispatch(
      removeOrderItemAsync({ userId: user.id, cartItemId: orderItemId })
    );
  };

  return (
    <section>
      <div>
        <div>
          <h5>Cart items</h5>
        </div>
        <div>
          {orderItem && orderItem.name === "Error" && (
            <p>{orderItem.message}</p>
          )}
          {cart && cart.orderItems && cart.orderItems.length > 0 ? (
            <div>
              <p>Total items: {cart.totalCartItems}</p>
              <p>Pre-Tax Order Total: ${cart.totalCost}</p>
              {cart.orderItems.map((orderItem) => (
                <div key={orderItem.id}>
                  <div>
                    <img
                      src={orderItem.product.prodImg}
                      alt={orderItem.product.prodName}
                    />
                  </div>
                  <div>
                    <p>
                      <Link to={`/allProducts/${orderItem.product.id}`}>
                        <strong>{orderItem.product.prodName}</strong>
                      </Link>
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(orderItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(event) => setQty(event.target.value)}
                    />
                    {qty >= 0 &&
                      (qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(orderItem.id)}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(
                              orderItem.id,
                              orderItem.product.prodPrice
                            )
                          }
                        >
                          Update
                        </button>
                      ))}
                    <p>${orderItem.product.prodPrice}</p>
                  </div>
                  <p>ProdQty: {orderItem.quantity}</p>
                  <p>
                    ProdTotal: <strong>${orderItem.total}</strong>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>There are no items in the cart</div>
          )}
          <button type="button" onClick={() => navigate("/allProducts")}>
            Back to Home
          </button>
          {cart && cart.orderItems && cart.orderItems.length > 0 && (
            <button type="button" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
