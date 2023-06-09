import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { fetchCartAsync, selectCart } from "./cartSlice";
import {
  editOrderItemAsync,
  deleteOrderItemAsync,
  selectOrderItem,
} from "./orderItemSlice";

/* This component is used to display cart with orderItems */
const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  const cart = useSelector(selectCart);
  const orderItem = useSelector(selectOrderItem);

  const [qty, setQty] = useState(1);

  /* This function is used to update quantity in the cart */
  const handleUpdateQuantity = async (orderItemId, prodPrice) => {
    const reqBody = { qty, prodPrice };
    await dispatch(editOrderItemAsync({ orderItemId, reqBody }));
    await dispatch(fetchCartAsync(user));
  };

  /* This function is used to delete the product in the cart */
  const handleDelete = async (orderItemId) => {
    await dispatch(deleteOrderItemAsync(orderItemId));
    await dispatch(fetchCartAsync(user));
  };

  return (
    <div>
      <h5>Cart items</h5>
      {orderItem.name === "Error" && (
        <p className="text-danger-emphasis">{orderItem.message}</p>
      )}
      {cart?.orderItems?.length > 0 ? (
        <div>
          <p>Total items: {cart?.totalCartItems}</p>
          <p>Pre-Tax Order Total: ${cart?.totalCost}</p>
          {cart?.orderItems?.map((orderItem) => {
            return (
              <div key={orderItem.id}>
                <div>
                  <img
                    src={orderItem.product.prodImg}
                    alt={orderItem.product.prodName}
                  />
                </div>
                <div>
                  <Link to={`/allProducts/${orderItem.product.id}`}>
                    <strong>{orderItem.product.prodName}</strong>
                  </Link>
                </div>
                <div>
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
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <div>There are no items in the cart</div>
      )}
      <button type="button" onClick={() => navigate("/allProducts")}>
        Back to Shopping
      </button>
    </div>
  );
};

export default Cart;
