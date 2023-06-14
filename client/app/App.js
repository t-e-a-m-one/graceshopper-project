import React from "react";
import AppRoutes from "./AppRoutes";

import Navbar from "../features/navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
