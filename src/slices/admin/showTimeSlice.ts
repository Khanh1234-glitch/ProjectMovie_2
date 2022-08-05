import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ShowTimeInterface } from "../../interface/interfaceAdmin/showTimeInterface";
import showTime from "../../services/Admin/showTime";


export interface showTime {
    showtime:ShowTimeInterface,
    isLoading:boolean,
    error:string,
}

const initialState : showTime = {
    showtime: {} as ShowTimeInterface,
    isLoading:false,
    error:""
}


export const createShowTime = createAsyncThunk(
    "admin/showTime",
   async (thongTinLichChieu:any) => {
        try {
            const showtime = await showTime.ShowTime(thongTinLichChieu);
            alert("Thêm lịch thành công")
            return showtime;
        } catch (error) {
            throw error
        }
   }
)

const createShowTimeSlice = createSlice({
    name:"ShowTime",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(createShowTime.pending,(state)=>{
            return {...state, isLoading:true}
        })
        builder.addCase(createShowTime.fulfilled,(state, {payload})=>{
            alert(payload)
            return {...state, isLoading:true, showtime:payload}
        })
        builder.addCase(createShowTime.rejected,(state, error)=>{
            alert(error.error.message)
            return {...state, isLoading:true, error:error.error.message as string}
        })
    },
})

export default createShowTimeSlice.reducer