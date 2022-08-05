
import { infoListCinema } from '../interface/interfaceDetail/infoListCinema';
import { ManamentMovie } from '../interface/manamentCinema/ManamentMovie';
import { SystemCinema } from '../interface/tableListMovie/systemCinema';
import axiosClient from "./axiosClient"


const manamentCinemaAPI ={
    getInfoSystem:()=>{
        return  axiosClient.get<unknown,SystemCinema[] >(`QuanLyRap/LayThongTinLichChieuHeThongRap`);
    },
    infoList:(maPhim:any)=>{
        return axiosClient.get<unknown,infoListCinema>(`QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`)
    },
   manamentMovie:(evt:any)=>{
        return axiosClient.get<unknown,ManamentMovie[]>(`QuanLyPhim/LayDanhSachPhim`,evt)
   },

}

export default manamentCinemaAPI