import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import dogsReducer from "../features/allDogs/allDogsSlice";
import singleDogReducer from "../features/singleDog/singleDogSlice";
import cartReducer from "../features/cart/cartSlice";
import orderItemReducer from "../features/cart/orderItemSlice"; // Import the orderItemSlice reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogsReducer,
    singleDog: singleDogReducer,
    cart: cartReducer,
    orderItem: orderItemReducer, // Add the orderItemSlice reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/allDogs/allDogsSlice";
export * from "../features/cart/cartSlice";
export * from "../features/cart/orderItemSlice"; // Export the orderItemSlice actions
