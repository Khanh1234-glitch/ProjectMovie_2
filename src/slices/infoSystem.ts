
import { AxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../services/movieAPI";
import { SystemCinema } from "../interface/tableListMovie/systemCinema";
import manamentCinemaAPI from '../services/manamentCineAPI';

interface SystemState {
  data: SystemCinema[];
  isLoading: boolean;
  error: string;
}
const initialState: SystemState = {
  data: [],
  isLoading: false,
  error: "",
};

export const createinfoSystem = createAsyncThunk(
  "infoSystem/getInfoSystem",
  async () => {
    try {
      const data = await manamentCinemaAPI.getInfoSystem();
      return data;
    } catch (error) {
      const err = (error as AxiosError).response?.data as any;
      throw err.content;
    }
  }
);

export const createInfoMovieSlice = createSlice({
  name: "infoSystem",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createinfoSystem.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(createinfoSystem.fulfilled, (state, action) => {
      return { ...state, isLoading: false, data: action.payload };
    });
    builder.addCase(createinfoSystem.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default createInfoMovieSlice.reducer;
