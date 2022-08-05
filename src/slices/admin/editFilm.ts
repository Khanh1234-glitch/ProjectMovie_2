import { EditFilm } from './../../interface/interfaceAdmin/EditFilm';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Admin from '../../services/Admin/admin';

export interface EditInfoFilm{
    data:EditFilm,
    isLoading:boolean,
    error:string | null ,
} 

const initialState : EditInfoFilm = {
    data:{} as EditFilm,
    isLoading:false,
    error:"",
}

export const createEditFilm = createAsyncThunk(
    "admin/editfilm",
    async (id:any) => {
        try {
            const data = await Admin.infoFilmEdit(id);
            return data;
        } catch (error) {
            throw error
        }
    }
)

const EditFilmSlice = createSlice({
    name:"editFilm",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createEditFilm.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createEditFilm.fulfilled,(state, {payload})=>{
            return {...state, isLoading:true, data:payload}
        })
        builder.addCase(createEditFilm.rejected,(state, error)=>{
            return {...state, isLoading:true, error:error.error.message as string }
        })
    },
})

export default  EditFilmSlice.reducer