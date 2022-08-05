import { createCalendarFilm } from './../../interface/interfaceAdmin/createCalendarFilm';
import { EditFilm } from './../../interface/interfaceAdmin/EditFilm';
import React from 'react'
import axiosClient from '../axiosClient'

const Admin =  {
    infoFilmEdit:(id:any)=>{
        return axiosClient.get<unknown, EditFilm>(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    },
    updateFilmAPI:(formData:any)=>{
        return axiosClient.post<unknown, EditFilm>(`QuanLyPhim/CapNhatPhimUpload`, formData)
    },
    deleteFilm:(maPhim:any)=>{
        return axiosClient.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    },
    infoSystemCinema:()=>{
        return axiosClient.get<unknown, createCalendarFilm[]>(`QuanLyRap/LayThongTinHeThongRap`)
    }
}

export default Admin