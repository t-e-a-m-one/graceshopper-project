import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

//Gets all dogs
export const fetchAllDogs = createAsyncThunk("dogs/fetchAll", async () => {
  try {
    const { data } = await axios.get("/api/dogs");
    console.log("RESPONSE", data);
    return data;
  } catch (error) {
    // return error.message
    throw new Error(error.message);
  }
});

//Slice
export const allDogsSlice = createSlice({
  name: "dogs",
  initialState: {
    allDogs: [],
    status: "idle", // Add a status field to track the fetch status
    error: null, // Add an error field to store any potential errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDogs.pending, (state) => {
        state.status = "loading"; // Set the status to "loading" when the fetch is in progress
      })
      .addCase(fetchAllDogs.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set the status to "succeeded" when the fetch is successful
        state.allDogs = action.payload;
      })
      .addCase(fetchAllDogs.rejected, (state, action) => {
        state.status = "failed"; // Set the status to "failed" when the fetch encounters an error
        state.error = action.error.message;
      });
  },
});

export default allDogsSlice.reducer;
