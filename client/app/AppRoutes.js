// routes.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AllDogs from "../features/allDogs/AllDogs";
import SingleDog from "../features/singleDog/SingleDog";
import Cart from "../features/checkout/Cart";
import Checkout from "../features/checkout/Checkout";
import AdminPage from "../features/admin/AdminPage"; // Import the AdminPage component
import SignUpForm from "../features/auth/SignUpForm";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "../features/checkout/cartSlice";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  useEffect(() => {
    if (isAdmin && isLoggedIn) {
      navigate("/admin");
    }
  }, [isAdmin, isLoggedIn, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<AllDogs />} />
            <Route path="/dogs" element={<AllDogs />} />
            <Route path="/dogs/:id" element={<SingleDog />} />
            <Route
              path="/cart"
              element={
                <Cart addToCart={addToCart} removeFromCart={removeFromCart} />
              }
            />
            <Route path="/cart/checkout" element={<Checkout />} />
            {isAdmin && <Route path="/admin" element={<AdminPage />} />}
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route path="/signup" element={<SignUpForm />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
