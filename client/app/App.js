import React, { useState } from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import AllDogs from "../features/allDogs/AllDogs";
// import SingleDog from "../features/singleDog/SingleDog";
import SignUpForm from "../features/auth/SignUpForm";
import Checkout from "../features/checkout/Checkout";
// import Cart from "../features/cart/Cart";

const App = () => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleCheckoutClick}>Checkout</button>
      {showCheckout && <Checkout />}
      <SignUpForm />
      <AppRoutes />
      <AllDogs />
      {/* <SingleDog /> */}
      {/* <Cart />  */}
    </div>
  );
};

export default App;
