import { CheckoutInterface } from '../interface/interfaceCheckout/CheckoutInterface'
import axiosClient from './axiosClient'


const bookTicket ={

    checkoutAPI:(maLichChieu:any)=>{
        return axiosClient.get<unknown,CheckoutInterface>(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
}

export default bookTicket


