import { createCalendarFilm } from "./../../interface/interfaceAdmin/createCalendarFilm";
import { infoClusterForCinema } from "./../../interface/interfaceAdmin/infoClusterForCinema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminCinemaSystem from "../../services/Admin/adminCinemaSystem";

export interface infoCluster {
  cluster: infoClusterForCinema[];
  isLoading: boolean;
  error: string | null;
}

const initialState: infoCluster = {
  cluster: [],
  isLoading: false,
  error: "",
};

export const createInfoClusterForCinema = createAsyncThunk(
  "admin/infoClusterForCinema",
  async (maHeThongRap: any) => {
    try {
      const cluster = await adminCinemaSystem.infoClusterForCinema(
        maHeThongRap
      );

      return cluster;
    } catch (error) {
      throw error;
    }
  }
);

const infoClusterForCinemaSlice = createSlice({
  name: "infoCluster",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createInfoClusterForCinema.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(
      createInfoClusterForCinema.fulfilled,
      (state, { payload }) => {
        return { ...state, isLoading: false, cluster: payload };
      }
    );
    builder.addCase(createInfoClusterForCinema.rejected, (state, error) => {
      return {
        ...state,
        isLoading: false,
        error: error.error.message as string,
      };
    });
  },
});
export default infoClusterForCinemaSlice.reducer;
