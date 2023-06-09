import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editOrderItemAsync = createAsyncThunk(
  "editOrderItem",
  async ({ orderItemId, reqBody }) => {
    try {
      
      const { data } = await axios.put(`/api/cart/${orderItemId}`, reqBody);
      return data;
    } catch (err) {
      throw new Error(
        `User quantity is greater than available product quantity`
      );
    }
  }
);



export const deleteOrderItemAsync = createAsyncThunk(
  "deleteOrderItem",
  async (orderItemId) => {
    try {
      const { data } = await axios.delete("/api/cart", {
        params: { orderItemId },
      });
      return data;
    } catch (err) {

    }
  }
);

const initialState = {};
export const orderItemSlice = createSlice({
  name: "orderItem",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(editOrderItemAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(editOrderItemAsync.rejected, (state, action) => {
        return action.error;
      }),
});

export const selectOrderItem = (state) => state.orderItem;

export default orderItemSlice.reducer;
