import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCalendarFilm } from "../../interface/interfaceAdmin/createCalendarFilm";
import Admin from "../../services/Admin/admin";


export interface CalendarFilm{
    data:createCalendarFilm[],
    isLoading:boolean,
    error:string |null,
}

const initialState : CalendarFilm = {
    data:[],
    isLoading:false,
    error:"",
}

export const asyncCalendarFilm = createAsyncThunk(
    "admin/createCalendarFilm",
   async () => {
        try {
            const data = await Admin.infoSystemCinema();
            return data;
        } catch (error) {
            throw error
        }
   }
)

const calendarFilmSlice = createSlice({
    name:"calendarFilm",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(asyncCalendarFilm.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(asyncCalendarFilm.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, data:payload}
        })
        builder.addCase(asyncCalendarFilm.rejected,(state, error)=>{
            return {...state, isLoading:false,error:error.error.message as string}
        })
    },
})

export default calendarFilmSlice.reducer