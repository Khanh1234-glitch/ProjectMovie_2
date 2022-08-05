import { RegisterValues } from '../interface/interfaceAuth/registerValues';
import { currentUser } from '../interface/interfaceAuth/auth';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from '../services/authAPI';

interface Register{
    // Thông tin của user đăng ký
    currentUser:currentUser;
    isLoading:boolean;
    error?:string;
}


const initialState:Register = {
    currentUser:{} as currentUser,
    isLoading:false,
    error:"",
}

// thunk action
export const CreateRegister = createAsyncThunk(
    "auth/register",
   async (values:RegisterValues) => {
    try {
        const data = await authAPI.register(values);
        return data;
    } catch (error) {
        throw error;
    }
   }
)
const RegisterSlice = createSlice({
    name:"register",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(CreateRegister.pending,(state)=>{
            return {...state, isLoading:true, error:""}
        })
        builder.addCase(CreateRegister.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false, currentUser:payload}
        })
        builder.addCase(CreateRegister.rejected,(state, {error})=>{
            return {...state, isLoading:false, error:error.message}
        })
    },
});
export default RegisterSlice.reducer