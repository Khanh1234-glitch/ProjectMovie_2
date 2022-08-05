import { createCalendarFilm } from './../../interface/interfaceAdmin/createCalendarFilm';
import { infoClusterForCinema } from './../../interface/interfaceAdmin/infoClusterForCinema';
import React from 'react'
import axiosClient from '../axiosClient'


const adminCinemaSystem = {
    infoClusterForCinema:(maHeThongRap:any)=>{
        return axiosClient.get<unknown, infoClusterForCinema[]>(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}

export default adminCinemaSystem