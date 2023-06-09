// Libraries
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// Files
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProductSlice from "../features/singleProduct/singleProductSlice";
import allProductsSlice from "../features/allProducts/allProductSlice";

/**
 * This is where we configure our Redux store. We import our slice reducers here.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    allProducts: allProductsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
