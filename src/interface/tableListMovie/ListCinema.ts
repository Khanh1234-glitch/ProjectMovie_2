import { ListCalendarForFilm } from './ListCalendarForFilm';
export interface ListCinema{
    dangChieu:boolean;
    hinhAnh:string;
    hot:boolean;
    lstLichChieuTheoPhim:ListCalendarForFilm[];
    maPhim:number;
    sapChieu:boolean;
    tenPhim:string;
}