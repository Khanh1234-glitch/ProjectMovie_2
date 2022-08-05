import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { bookingTicket, createCheckout } from "../../slices/checkout";
import { RootState } from "../../store";
import { CloseOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import "./Checkout.css";
const Checkout = () => {
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const { data, loading, err, listSeatBooking } = useSelector(
    (state: RootState) => state.CheckoutStore
  );

  const dispatch = useDispatch<any>();
  const param = useParams();
  useEffect(() => {
    dispatch(createCheckout(param.maLichChieu));
  }, []);
  if (!localStorage.getItem("user")) {
    return <Navigate to="/sign__in" />;
  }
  return (
    <div className="">
      <div className=" mt-5">
        <div className="row">
          <div className="col-12 col-xl-8  ">
            <div className="d-flex justify-content-center">
              <div className="screen">
                <div className="text-center mt-3">Màn hình</div>
              </div>
            </div>
            <div className="container mt-5 seatCheckout">
              {data?.danhSachGhe?.map((seat, index) => {
                const classSeatVip = seat.loaiGhe === "Vip" ? "seat_vip" : "";
                const classBookedSeat =
                  seat.daDat === true ? "booked_seat" : "";
                // Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
                const indexSeatBooking = listSeatBooking.findIndex(
                  (seatBooking) => seatBooking.maGhe === seat.maGhe
                );
                let classSeatBooking = "";
                if (indexSeatBooking != -1) {
                  classSeatBooking = "booking_seat";
                }
                return (
                  <div>
                    <button
                      onClick={() => {
                        dispatch({
                          type: bookingTicket(),
                          seatSelected: seat,
                        });
                      }}
                      disabled={seat.daDat}
                      className={`seat ${classSeatVip} ${classBookedSeat} ${classSeatBooking}`}
                      key={index}
                    >
                      {seat.daDat ? (
                        <CloseOutlined
                          style={{ marginBottom: "7.5px", fontWeight: "bold" }}
                        />
                      ) : (
                        seat.stt
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-xl-4">
            <h3 className="text-success text-center text-2xl">
              {listSeatBooking
                .reduce((total, seat, index) => {
                  return (total += seat.giaVe);
                }, 0)
                .toLocaleString()}
              đ
            </h3>
            <hr />
            <h3>{data?.thongTinPhim?.tenPhim}</h3>
            <p>Địa điểm: {data?.thongTinPhim?.diaChi} </p>
            <p>
              Ngày chiếu: {data?.thongTinPhim?.ngayChieu} -
              {data?.thongTinPhim?.gioChieu}
            </p>
            <hr />
            <div className="row">
              <div className="col-10">
                <span className="text-danger">
                  Ghế:
                  {listSeatBooking.map((seatBooking, index) => {
                    return <span>{seatBooking.tenGhe}</span>;
                  })}
                </span>
              </div>
              <div className="col-2 text-success">0 đ</div>
            </div>
            <hr />
            <i>Email</i>
            <br />
            {currentUser.email}
            <hr />
            <div className="mb-0 align-items-center flex-column d-flex justify-content-end">
              <div
                className="text-white w-100 text-center p-2 rounded font-weight-bold"
                style={{
                  background: "linear-gradient(to left,#fb4226,#ce3017 100%)",
                  cursor: "pointer",
                }}
              >
                Đặt vé
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const BookTickResult = () => {
  return (
    <div>Checkout</div>
  )
}


const CheckoutLayout = (props:any) => {
  const { TabPane } = Tabs;

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="mt-8" style={{marginTop:"100px"}}>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout {...props}/>
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <BookTickResult {...props}/>
        </TabPane>
      </Tabs>
   
    </div>
  );
};

export default CheckoutLayout;
