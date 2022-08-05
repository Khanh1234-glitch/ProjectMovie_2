import { Movie } from "../interface/movie";
import { AxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../services/movieAPI";

interface MoviesState {
  data: Movie[];
  isLoading: boolean;
  error: string;
}

const initialState: MoviesState = {
  data: [],
  isLoading: false,
  error: "",
};

export const MovieList = createAsyncThunk("movies/getMovieList", async (param:any) => {
  try {
    const data = await movieAPI.getMovieList(param);
    return data;
  } catch (error) {
    const err = (error as AxiosError).response?.data as any;
    throw err.content;
  }
});
export const createMovieSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(MovieList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(MovieList.fulfilled, (state, { payload }: any) => {
      return { ...state, isLoading: false, data: payload.items };
    });
    builder.addCase(MovieList.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message as string };
    });
  },
});

export default createMovieSlice.reducer;
