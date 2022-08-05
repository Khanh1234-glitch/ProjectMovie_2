import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ManamentMovie } from "../interface/manamentCinema/ManamentMovie";
import manamentCinemaAPI from "../services/manamentCineAPI";

export interface manamentMovie {
  data: ManamentMovie[];
  isLoading: boolean;
  error: string;
}

const initialState: manamentMovie = {
  data: [],
  isLoading: false,
  error: "",
};

export const MovieManament = createAsyncThunk(
  "manament/ManamentMovie",
  async (evt:any) => {
    try {
      const data = await manamentCinemaAPI.manamentMovie(evt);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const manamentMovieSlice = createSlice({
  name: "manamentMovie",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(MovieManament.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(MovieManament.fulfilled, (state, {payload}) => {
        return { ...state, isLoading: false, data:payload };
      });
      builder.addCase(MovieManament.rejected, (state, error) => {
        return { ...state, isLoading: false, error:error.error as string };
      });
  },
});

export default manamentMovieSlice.reducer;
