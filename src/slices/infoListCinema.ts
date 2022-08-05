import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { infoListCinema } from '../interface/interfaceDetail/infoListCinema';
import manamentCinemaAPI from '../services/manamentCineAPI';


interface infoCinema{
    data:infoListCinema,
    isLoading:boolean,
    error:string,
}
const initialState: infoCinema = {
  data: {} as infoListCinema,
  isLoading: false,
  error: "",
};

export const createInfoCinema = createAsyncThunk(
  "infoList/infoListCinema",
 async (maPhim:any) => {
    try {
      const data = await manamentCinemaAPI.infoList(maPhim);
      console.log(data);
      
      return data;
    } catch (error) {
      const err = (error as AxiosError).response?.data as any
      return err;
    }
 }
)

const infoListCinemaSlice = createSlice({
  name:"infoListCinema",
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(createInfoCinema.pending,(state)=>{
      return {...state, isLoading:true}
    })
    builder.addCase(createInfoCinema.fulfilled,(state, {payload})=>{
      return {...state, isLoading:false, data:payload}
    })
    builder.addCase(createInfoCinema.rejected,(state, {error})=>{
      return {...state, isLoading:false, error:error.message as string}
    })
  },
})

export default infoListCinemaSlice.reducer