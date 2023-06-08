import React, { useState } from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import AllDogs from "../features/allDogs/AllDogs";
import SingleDog from "../features/singleDog/SingleDog";
import SignUpForm from "../features/auth/SignUpForm";
// import CartPage from "../features/cart/cartPage"; // Import the CartPage component
import Checkout from "../features/checkout/Checkout";

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
      <AppRoutes />
      <SignUpForm />
      <AllDogs />
      <SingleDog />
      {/* <CartPage /> */}
    </div>
  );
};

export default App;
