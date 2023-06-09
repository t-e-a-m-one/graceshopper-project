import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchAllProductsAsync = createAsyncThunk(
  "allProducts",
  async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const newProduct = createAsyncThunk("newProduct", async (prodcutObj) => {
  try {
    const { data } = await axios.post(`/api/products`, prodcutObj);
    return data;
  } catch (error) {
    console.log("stuck on thunks");
    console.log(error);
  }
});

export const removeProduct = createAsyncThunk("removeProduct", async (id) => {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(newProduct.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllProducts = (state) => {
  return state.allProducts;
};

export default allProductsSlice.reducer;
