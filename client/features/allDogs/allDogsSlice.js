import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllDogs = createAsyncThunk("dogs/fetchAll", async () => {
  try {
    const { data } = await axios.get("/api/dogs");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteDog = createAsyncThunk("dogs/deleteDog", async (id) => {
  try {
    await axios.delete(`/api/dogs/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateDog = createAsyncThunk("dogs/updateDog", async (dog) => {
  try {
    const { data } = await axios.put(`/api/dogs/${dog.id}`, dog);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const allDogsSlice = createSlice({
  name: "dogs",
  initialState: {
    allDogs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDogs = action.payload;
      })
      .addCase(fetchAllDogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDog.fulfilled, (state, action) => {
        const dogId = action.payload;
        state.allDogs = state.allDogs.filter((dog) => dog.id !== dogId);
      })
      .addCase(updateDog.fulfilled, (state, action) => {
        const updatedDog = action.payload;
        state.allDogs = state.allDogs.map((dog) =>
          dog.id === updatedDog.id ? updatedDog : dog
        );
      });
  },
});

export default allDogsSlice.reducer;
