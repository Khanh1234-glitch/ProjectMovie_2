
import React from 'react'
import { ShowTimeInterface } from '../../interface/interfaceAdmin/showTimeInterface'
import axiosClient from '../axiosClient'

const showTime = {
    ShowTime:(thongTinLichChieu:any)=>{
        return axiosClient.post<unknown,ShowTimeInterface>(`QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
    }
}

export default showTime