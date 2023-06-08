// /* eslint-disable no-unused-vars */

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchCartItems = createAsyncThunk("fetchCartItems", async (id) => {
//   try {
//     const { data } = await axios.get(`/api/cart/${id}/products`);
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const addCartItemAsync = createAsyncThunk(
//   "addCartItem",
//   async ({ id, count, user }) => {
//     try {
//       const response = await axios.post(`/api/cart/${id}`, { id, count, user });
//       return response.data;
//     } catch (err) {
//       console.log("friendly error message:", err);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [], //array of products in cart
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchCartItems.fulfilled, (state, action) => {
//       console.log(action.payload, "Here is inside of the cartSlice");
//       return action.payload;
//     });
//     builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
//       console.log(state);
//       state.push(action.payload);
//     });
//   },
// });

// export default cartSlice.reducer;
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