import { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { EditFilm } from './../../interface/interfaceAdmin/EditFilm';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Admin from '../../services/Admin/admin';


export interface editFilmUpdate{
    data:EditFilm,
    isLoading:boolean,
    error:string,
}

const initialState : editFilmUpdate = {
    data: {} as EditFilm,
    isLoading:false,
    error:""
}

export const createEditFilmUpdate = createAsyncThunk(
    "admin/UpdateFilm",
   async (formData:any) => {
    try {
        const data = await Admin.updateFilmAPI(formData);
        alert("Sửa phim thành công")
        return data;
    } catch (error) {
        const err = (error as AxiosError).response?.data as any;
        alert(err)
        throw error
    }
   }
)

const editFilmUpdateSlice = createSlice({
    name:"editFilmUpdate",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(createEditFilmUpdate.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createEditFilmUpdate.fulfilled,(state, {payload})=>{
           
            return {...state, isLoading:true, data:payload}
        })
        builder.addCase(createEditFilmUpdate.rejected,(state, error)=>{
            return {...state, isLoading:true, error:error.error.message as string}
        })
    },
})

export default editFilmUpdateSlice.reducer