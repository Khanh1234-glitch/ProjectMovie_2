import { AddUser } from './../interface/interfaceAdmin/User/AddUser';
import { UserType } from './../interface/interfaceAdmin/User/UserType';
import { ListUser } from './../interface/interfaceAdmin/User/ListUser';
import axiosClient from "./axiosClient"


const manamentUserAPI ={
    listUser:(evt:any)=>{
        return axiosClient.get<unknown,ListUser[]>(`QuanLyNguoiDung/LayDanhSachNguoiDung`,evt)
    },
    UserType:()=>{
        return axiosClient.get<unknown,UserType[]>(`QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    },
    AddUser:(formData:any)=>{
        return axiosClient.get<unknown,AddUser>(`QuanLyNguoiDung/ThemNguoiDung`,formData)
    }
}

export default manamentUserAPI