import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (user) => {
  try {
    
    if (user) {
      const userId = user.id;

      const { data } = await axios.get("/api/cart", { params: { userId } });
      return data;
    }
  } catch (err) {
  }
});

export const addCartAsync = createAsyncThunk("addCart", async (reqbody) => {
  try {
   
    const { data } = await axios.post("/api/cart", reqbody);
   
    return data;
  } catch (err) {
    throw new Error(`User quantity is greater than available product quantity`);
  }
});

export const updateCheckoutCartAsync = createAsyncThunk(
  "updateCart",
  async (reqbody) => {
    try {
     
      const { data } = await axios.put("/api/cart", reqbody);
      
      return data;
    } catch (err) {
      throw new Error(
        `User quantity is greater than available product quantity`
      );
    }
  }
);

const initialState = {};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCartAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addCartAsync.rejected, (state, action) => {
        
        return action.error;
      })
      .addCase(updateCheckoutCartAsync.rejected, (state, action) => {
       
        return action.error;
      });
  },
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
