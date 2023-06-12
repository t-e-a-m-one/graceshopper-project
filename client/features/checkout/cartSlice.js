import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
// import { Order } from "../../../server/db/models/Order";

// export const createOrder = createAsyncThunk(
//   "cart/createOrder",
//   async (_, { getState }) => {
//     const { items, totalPrice } = getState().cart;
//     // Use items and totalPrice to create the order data
//     const orderData = {
//       items: items,
//       totalPrice: totalPrice,
//       // other relevant fields
//     };

//     // Call the Sequelize methods to create a new order entry in the database
//     const createdOrder = await Order.create(orderData);

//     return createdOrder;
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
        addToCart: (state, action) => {
          const item = action.payload;
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.amount += 1;
          } else {
            const newItem = {
              ...item,
              amount: 1,
              price: item.price, // Set the correct price value
            };
            state.items.push(newItem);
          }
          state.totalPrice += item.price;
        },
        removeFromCart: (state, action) => {
          const itemId = action.payload;
          const existingItem = state.items.find((i) => i.id === itemId);
          if (existingItem) {
            if (existingItem.amount === 1) {
              state.items = state.items.filter((i) => i.id !== itemId);
            } else {
              existingItem.amount -= 1;
            }
            state.totalPrice -= existingItem.price;
          }
        }
      }
    });


export const { addToCart, removeFromCart } = cartSlice.actions;

// Select cart items
export const selectCartItems = createSelector(
  (state) => state.cart,
  (cart) => cart
);

export default cartSlice.reducer;
