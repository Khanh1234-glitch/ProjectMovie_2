import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser } from "../interface/interfaceAuth/auth";
import { LoginValues } from "../interface/interfaceAuth/loginValues";
import authAPI from "../services/authAPI";

interface AuthState {
  // user login infomation
  currentUser: currentUser;
  isLoading: boolean;
  error?: string;
}

const initialState:AuthState = {
    currentUser:JSON.parse(localStorage.getItem('user')as string)||{},
    isLoading:false,
    error:"",
};
// thunk action
export const signIn = createAsyncThunk(
  "auth/login",
 async (values:LoginValues) => {
  try {
    const data = await authAPI.login(values);
    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem("user",JSON.stringify(data))
    return data
  } catch (error) {
      throw error;
  }
 }
)
const authSlice= createSlice({
  name:"auth",
  initialState,
  reducers:{
    Logout:(state:AuthState)=>{
      // Xoá thông tin của user
      localStorage.removeItem('user');
      // set state currentUser về obj rỗng
      return {...state,currentUser:{}as currentUser}
    }
  },
  extraReducers:(builder)=> {
    builder.addCase(signIn.pending,(state)=>{
      return {...state, isLoading:true, error:""}
    })
    builder.addCase(signIn.fulfilled,(state, {payload})=>{
      return {...state, isLoading:false,currentUser:payload }
    })
    builder.addCase(signIn.rejected,(state, {error})=>{
      return {...state, isLoading:false,error:error.message }
    })
  },
})
export const {Logout} = authSlice.actions
export default authSlice.reducer;