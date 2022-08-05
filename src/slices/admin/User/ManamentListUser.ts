import { ListUser } from './../../../interface/interfaceAdmin/User/ListUser';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manamentUserAPI from '../../../services/manamentUserAPI';


export interface ManamentListUser{
    data:ListUser[],
    isLoading:boolean,
    error:string | null ,
}

const initialState : ManamentListUser = {
    data:[],
    isLoading:false,
    error:"",
}


export const createListUser = createAsyncThunk(
    "admin/ManamentListUser",
   async (evt:any) => {
        try {
            const data = await manamentUserAPI.listUser(evt);
            return data;
        } catch (error) {
            throw error
        }
   }
)

const ListUserSlice = createSlice ({
    name:"ListUser",
    initialState,
    reducers:{},

    extraReducers:(builder)=> {
        builder.addCase(createListUser.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createListUser.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, data:payload}
        })
        builder.addCase(createListUser.rejected,(state, error)=>{
            return {...state, isLoading:false, error:error.error.message as string}
        })
    },
})


export default ListUserSlice.reducer