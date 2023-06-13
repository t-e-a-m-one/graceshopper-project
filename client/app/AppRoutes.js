import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import AllDogs from '../features/allDogs/AllDogs';
import SingleDog from '../features/singleDog/SingleDog';
import Cart from "../features/checkout/Cart";
import SignUpForm from '../features/auth/SignUpForm';
// import { addToCart, removeFromCart, selectCartItems } from "../features/checkout/cartSlice";
import Checkout from "../features/checkout/Checkout";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  // const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<AllDogs />} />
        <Route path="/dogs/:id" element={<SingleDog />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* element={<Cart />} */}
        <Route path="/cart/:userId" Component={Cart}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
          <Route path="/dogs" element={<AllDogs />} />
          <Route path="/dogs/:id" element={<SingleDog />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/" element={<AuthForm name="login" displayName="Login" />} />
        <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />
        <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

export default AppRoutes;

















// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Route, Routes } from 'react-router-dom';
// import AuthForm from '../features/auth/AuthForm';
// import Home from '../features/home/Home';
// import { me } from './store';
// import AllDogs from '../features/allDogs/AllDogs';
// import SingleDog from '../features/singleDog/SingleDog';
// import Cart from "../features/checkout/Cart";
// import { addToCart, removeFromCart, selectCartItems } from "../features/checkout/cartSlice";
// import Checkout from "../features/checkout/Checkout";

// /**
//  * COMPONENT
//  */

// const AppRoutes = () => {
//   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
//   const cartItems = useSelector(selectCartItems);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(me());
//   }, []);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <Routes>
//           <Route path="/*" element={<Home />} />
//           <Route to="/home" element={<Home />} />
//            <Route path="/dogs" element={<AllDogs />} />
//          <Route path="/dogs/:id" element={<SingleDog />} />
//          <Route path="/cart" element={<Cart addToCart={addToCart} removeFromCart={removeFromCart}  />} />
//           <Route path="/checkout" element={<Checkout />} />
//         </Routes>
//       ) : (
//         <Routes>
//           <Route
//             path="/*"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/login"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/signup"
//             element={<AuthForm name="signup" displayName="Sign Up" />}
//           />

//         </Routes>
//       )}
//     </div>
//   );

// };

// export default AppRoutes;
