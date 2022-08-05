import { UserType } from './../../../interface/interfaceAdmin/User/UserType';
import { ListUser } from './../../../interface/interfaceAdmin/User/ListUser';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import manamentUserAPI from '../../../services/manamentUserAPI';


export interface ManamentUserType{
    data:UserType[],
    isLoading:boolean,
    error:string | null ,
}

const initialState : ManamentUserType = {
    data:[],
    isLoading:false,
    error:"",
}


export const createUserType = createAsyncThunk(
    "admin/UserType",
   async () => {
        try {
            const data = await manamentUserAPI.UserType();
            return data;
        } catch (error) {
            throw error
        }
   }
)

const createUserTypeSlice = createSlice ({
    name:"UserType",
    initialState,
    reducers:{},

    extraReducers:(builder)=> {
        builder.addCase(createUserType.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createUserType.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, data:payload}
        })
        builder.addCase(createUserType.rejected,(state, error)=>{
            return {...state, isLoading:false, error:error.error.message as string}
        })
    },
})


export default createUserTypeSlice.reducer