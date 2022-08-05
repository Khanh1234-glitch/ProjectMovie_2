import React from 'react'
import { AddFilmInterface } from '../interface/interfaceAdmin/AddFilmInterface'
import axiosClient from './axiosClient'

const addFilmAPI = {
    addFilm:(formData:any)=>{
        return axiosClient.post<unknown,any>("QuanLyPhim/ThemPhimUploadHinh",formData)
    }
}

export default addFilmAPI