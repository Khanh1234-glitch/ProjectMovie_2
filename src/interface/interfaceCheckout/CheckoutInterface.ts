import { seatCheckout } from './seatCheckout';
import { infoCheckout } from './infoCheckout';
export interface CheckoutInterface {
  thongTinPhim:infoCheckout ;
  danhSachGhe:seatCheckout[];
}
