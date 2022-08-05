import { seatCheckout } from './../interface/interfaceCheckout/seatCheckout';
import { CheckoutInterface } from '../interface/interfaceCheckout/CheckoutInterface';
import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookTicket from '../services/bookTicket';


interface Checkout{
    data:CheckoutInterface;
    loading:boolean;
    err?:string;
    listSeatBooking:seatCheckout[];
}

const initialState : Checkout ={
    data: {} as CheckoutInterface,
    loading:false,
    err:"",
    listSeatBooking:[],
}
export const createCheckout = createAsyncThunk(
    "infoList/infoListCinema",
   async (maLichChieu:any) => {
      try {
        const data = await bookTicket.checkoutAPI(maLichChieu);
        return data
      } catch (error) {
        const err = (error as AxiosError).response?.data as any
        return err;
      }
   }
   
  )
const CheckoutSlice = createSlice({
    name:"checkout",
    initialState,
    reducers:{
        bookingTicket:(state:Checkout)=>{
            console.log(state.listSeatBooking);
            const ListSeatUpdate = [...state.listSeatBooking];
            const Index = ListSeatUpdate.findIndex(seatBooking => seatBooking.maGhe ===seatBooking.maGhe )
            if(Index != -1){
                // Nếu tìm thấy ghế trong mảng có nghĩa là trước đó đã click vào rồi => xóa đi
                ListSeatUpdate.slice(Index, 1)
            }else{
                ListSeatUpdate.push(...state.listSeatBooking)
            }
            return {...state,listSeatBooking:ListSeatUpdate}
        }
    },


    extraReducers:(builder)=> {
        builder.addCase(createCheckout.pending,(state)=>{
            return {...state , loading:true}
        })
        builder.addCase(createCheckout.fulfilled,(state, {payload})=>{
            return {...state , loading:true, data:payload}
        })
        builder.addCase(createCheckout.rejected,(state, err)=>{
            return {...state , loading:true, error:err.error.message as string}
        })
    },
})
export const { bookingTicket } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;