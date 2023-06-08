import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import dogsReducer from "../features/allDogs/allDogsSlice";
import singleDogReducer from "../features/singleDog/singleDogSlice";
import cartReducer from "../features/cart/cartSlice"; // Import the cartSlice reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogsReducer,
    singleDog: singleDogReducer,
    cart: cartReducer, // Add the cartSlice reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/allDogs/allDogsSlice";
export * from "../features/cart/cartSlice";
