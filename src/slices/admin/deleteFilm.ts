import { MovieManament } from './../manamentMovie';
import { useDispatch } from 'react-redux';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Admin from "../../services/Admin/admin";


export interface DeleteFilm {
    data:any,
    isLoading:boolean,
    error:string
}
const initialState : DeleteFilm = {
    data:{} as string,
    isLoading:false,
    error:"",
}

export const createDeleteFilm = createAsyncThunk(
    "admin/deleteFilm",
   async (maPhim:any) => {
    try {
        const data = await Admin.deleteFilm(maPhim);
        return data
    } catch (error) {
        throw error        
    }
   }
)
const deleteFilmSlice = createSlice({
    name:"deleteFilmSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createDeleteFilm.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createDeleteFilm.fulfilled,(state, {payload})=>{
            return {...state, isLoading:true, data:payload}
        })
        builder.addCase(createDeleteFilm.rejected,(state, error)=>{
            return {...state, isLoading:true, error:error.error.message as string}
        })
    },
})
export default deleteFilmSlice.reducer
