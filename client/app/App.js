import React, { useState } from "react";
import HomePage from "../features/home/HomePage";
import Checkout from "../features/checkout/Checkout";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  const [isReadyToCheckout, setIsReadyToCheckout] = useState(false);

  function handleCheckoutClick() {
    setIsReadyToCheckout(true);
  }

  return (
    <div>
      <Navbar />
      {isReadyToCheckout ? (
        <Checkout />
      ) : (
        <button onClick={handleCheckoutClick}>Checkout</button>
      )}
      <AppRoutes />
      <HomePage />
    </div>
  );
};

export default App;
