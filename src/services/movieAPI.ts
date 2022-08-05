import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Movie } from "../interface/movie";
import axiosClient from "./axiosClient"
const movieAPI = {
    getMovieBanner: ()=>{
        return axiosClient.get<unknown, Movie[]>("QuanLyPhim/LayDanhSachBanner");
    },
    getMovieList:(param:any)=>{
        return axiosClient.get<unknown, Movie[]>(`QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${param}&soPhanTuTrenTrang=${3}`);
    },
}

export default movieAPI