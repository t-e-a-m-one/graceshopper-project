import React from "react";
import AppRoutes from "./AppRoutes";

import Navbar from "../features/navbar/Navbar";
import SignUpForm from "../features/auth/SignUpForm";
import Checkout from "../features/checkout/Checkout";
// import AllDogs from '../features/allDogs/AllDogs'
// import SingleDog from '../features/singleDog/SingleDog'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <SignUpForm />
      <Checkout />
      {/* <AllDogs />
      <SingleDog /> */}
    </div>
  );
};

export default App;
