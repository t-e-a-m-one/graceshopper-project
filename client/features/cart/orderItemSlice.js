import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "../../../server/api/cartApi";

export const updateOrderItemQuantityAsync = createAsyncThunk(
  "orderItem/updateOrderItemQuantityAsync",
  async ({ userId, cartItemId, quantity }) => {
    const response = await updateCartItemQuantity(userId, cartItemId, quantity);
    return response;
  }
);

export const removeOrderItemAsync = createAsyncThunk(
  "orderItem/removeOrderItemAsync",
  async ({ userId, cartItemId }) => {
    await removeCartItem(userId, cartItemId);
    return cartItemId;
  }
);

const orderItemSlice = createSlice({
  name: "orderItem",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderItemQuantityAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(removeOrderItemAsync.fulfilled, (state, action) => {
        const cartItemId = action.payload;
        state.data = {
          ...state.data,
          orderItems: state.data.orderItems.filter(
            (item) => item.id !== cartItemId
          ),
        };
      });
  },
});

export default orderItemSlice.reducer;
