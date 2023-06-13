import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import dogsReducer from '../features/allDogs/allDogsSlice'
import singleDogReducer from '../features/singleDog/singleDogSlice'
import cartSliceReducer from '../features/checkout/cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogsReducer,
    singleDog: singleDogReducer,
    cart: cartSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

console.log(store.getState());

export default store;
export * from '../features/auth/authSlice';
export * from '../features/allDogs/allDogsSlice';
export * from '../features/checkout/cartSlice'
