import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (orderData) => {
    try {
      const response = await axios.post("/api/orders", orderData);
      const createdOrder = response.data;

      return createdOrder;
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    // totalPrice: 0, // Commented out the totalPrice
    orders: [],
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
          // price: item.price, // Commented out the price
        };
        state.items.push(newItem);
      }
      // state.totalPrice += item.price; // Commented out the totalPrice update
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
        // state.totalPrice -= existingItem.price; // Commented out the totalPrice update
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      const newOrder = {
        id: state.orders.length + 1,
        items: state.items,
        checkout: false,
      };

      state.orders.push(newOrder);
      state.items = [];
      // state.totalPrice = 0; // Commented out the totalPrice update
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
