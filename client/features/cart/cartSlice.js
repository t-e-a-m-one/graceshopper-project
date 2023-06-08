import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartItemsAPI, addCartItemAPI, removeCartItemAPI } from "./api";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await fetchCartItemsAPI(userId);
    return response.data;
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async ({ dogId, userId }) => {
    const response = await addCartItemAPI(dogId, userId);
    return response.data;
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async ({ dogId, userId }) => {
    const response = await removeCartItemAPI(dogId, userId);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default cartSlice.reducer;
