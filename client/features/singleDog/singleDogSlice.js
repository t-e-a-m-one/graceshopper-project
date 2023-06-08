import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  dog: {},
  status: "idle",
  error: null,
};

//Get single dog
export const getSingleDog = createAsyncThunk(
  "singleDog/getSingleDog",
  async (id) => {
    console.log("ID", id); // Add this line to log the value of the id parameter
    try {
      const { data } = await axios.get(`/api/dogs/${id}`);
      console.log("RESPONSE", data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

//This is the slice
export const SingleDogSlice = createSlice({
  name: "singleDog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleDog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleDog.fulfilled, (state, action) => {
        state.status = "succeded";
        state.dog = action.payload;
      })
      .addCase(getSingleDog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SingleDogSlice.reducer;
