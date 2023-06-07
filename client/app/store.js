import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer, { login } from "../features/auth/authSlice";
// import dogsReducer from "../features/allDogs/allDogsSlice";
// import singleDogReducer from "../features/singleDog/singleDogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // dogs: dogsReducer,
    // singleDog: singleDogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
// export * from "../features/allDogs/allDogsSlice";
export { login }; // Export the 'login' action
