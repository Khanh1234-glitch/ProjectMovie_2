import { ListCinema } from './ListCinema';
export interface ListClusterCinema{
    maCumRap:  string;
    tenCumRap: string;
    hinhAnh:   string;
    diaChi:    string;
    danhSachPhim:ListCinema[];
}
