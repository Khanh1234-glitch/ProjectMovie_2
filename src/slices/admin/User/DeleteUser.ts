
import { useDispatch } from 'react-redux';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manamentUserAPI from '../../../services/manamentUserAPI';


export interface DeleteUser {
    data:any,
    isLoading:boolean,
    error:string
}
const initialState : DeleteUser = {
    data:{} as string,
    isLoading:false,
    error:"",
}

export const createDeleteUser = createAsyncThunk(
    "admin/deleteUser",
   async (taiKhoan:any) => {
    try {
        const data = await manamentUserAPI.deleteUser(taiKhoan);
        alert("Xóa thành công")
        return data
    } catch (error) {
        throw error        
    }
   }
)
const deleteFilmSlice = createSlice({
    name:"deleteUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createDeleteUser.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createDeleteUser.fulfilled,(state, {payload})=>{
            return {...state, isLoading:true, data:payload}
        })
        builder.addCase(createDeleteUser.rejected,(state, error)=>{
            alert(error.error.message)
            return {...state, isLoading:true, error:error.error.message as string}
        })
    },
})
export default deleteFilmSlice.reducer
