import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../app/store";
import { fetchCartAsync, selectCart } from "../cart/cartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <Link to="/allProducts">
        <h1>Fetch</h1>
      </Link>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">
              <h2>Home</h2>
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>

            {(!cart ||
              cart?.totalCartItems === 0 ||
              cart.status === "Completed") && (
              <button onClick={() => navigate("/cart")}>
                <i>0</i>
              </button>
            )}
            {cart.totalCartItems > 0 && cart.status === "Pending" && (
              <button onClick={() => navigate("/cart")}>
                <i>{cart.totalCartItems}</i>
              </button>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login">
              <h2>Login</h2>
            </Link>
            <Link to="/signup">
              <h2>Sign Up</h2>
            </Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
