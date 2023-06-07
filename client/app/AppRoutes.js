import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
// import AllDogs from "../features/allDogs/AllDogs";
// import SingleDog from "../features/singleDog/SingleDog";
import Cart from "../features/cart/Cart";
import Login from "../features/auth/Login"; // Import the Login component

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/*" element={<Home />} />
            <Route to="/home" element={<Home />} />
            {/* <Route path="/dogs" element={<AllDogs />} />
            <Route path="/dogs/:id" element={<SingleDog />} /> */}
            <Route path="/users/:id/cartitems" element={<Cart />} />
          </>
        ) : (
          <>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
