import { CalendarDetail } from "./calendarDetail";

export interface DetailGroup {
    maCumRap:  string;
    tenCumRap: string;
    hinhAnh:   string;
    diaChi:    string;
    lichChieuPhim: CalendarDetail[];
}