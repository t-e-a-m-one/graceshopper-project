import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCart,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
} from "../../../server/api/cartApi";

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (userId) => {
    const response = await fetchCart(userId);
    return response;
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async ({ userId, dogId }) => {
    const response = await addCartItem(userId, dogId);
    return response;
  }
);

export const updateCartItemQuantityAsync = createAsyncThunk(
  "cart/updateCartItemQuantityAsync",
  async ({ userId, cartItemId, quantity }) => {
    const response = await updateCartItemQuantity(userId, cartItemId, quantity);
    return response;
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async ({ userId, cartItemId }) => {
    await removeCartItem(userId, cartItemId);
    return cartItemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateCartItemQuantityAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
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

export default cartSlice.reducer;
