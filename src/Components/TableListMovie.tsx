import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { createinfoSystem } from "../slices/infoSystem";
import { Tabs } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import { NavLink, useSearchParams } from "react-router-dom";
import { MovieList } from "../slices/moviesList";
const TableListMovie = () => {
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.infoSystem
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(createinfoSystem());
  }, []);
  const { TabPane } = Tabs;
  const moment = require("moment");
  type TabPosition = "left" | "right" | "top" | "bottom";
  const [tabPosition] = useState<TabPosition>("left");
  console.log("Data13", data);
  // Hình thay thế những tấm hình bị hư trong API
  const FALLBACK_IMAGE =
    "https://www.kindacode.com/wp-content/uploads/2021/08/oops.png";
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    event.currentTarget.className = "error";
  };
  return (
    <>
      <div id="cumrap" className="container">
        <Tabs tabPosition={tabPosition}>

          {data?.map((infoSystem, index) => {
            return (
              <TabPane
                tab={
                  <img
                    src={infoSystem.logo}
                    className="rounded-full"
                    width={"50px"}
                  />
                }
                key={index}
              >
                <Tabs tabPosition={tabPosition}>
                  {infoSystem.lstCumRap.map((cluster, index) => {
                    return (
                   
                      <TabPane 
                        tab={
                          <div
                            style={{
                              width: "300px",
                              textAlign: "start",
                              display: "flex",
                            }}
                          >
                            <div>
                              <img
                                src={cluster.hinhAnh}
                                className="mr-3"
                                width={"50px"}
                              />
                            </div>
                            <br />
                            <div>
                              <span className="text-success font-weight-bold">
                                {cluster.tenCumRap}
                              </span>
                              <br />
                              <p style={{ color: "gray" }}>
                                Địa chỉ: {cluster.diaChi}
                              </p>
                              <p className="text-danger">[Chi tiết]</p>
                            </div>
                          </div>
                        }
                        key={index}
                      >
                        {cluster.danhSachPhim.map((list, index) => {
                          return (
                            <div
                              className=" border-bottom border-dark pb-3"
                              key={index}
                            >
                              <div className="mt-5 d-flex">
                                <div>
                                  <img
                                    style={{ width: "75px", height: "75px" }}
                                    src={list.hinhAnh}
                                    alt={list.tenPhim}
                                    onError={imageOnErrorHandler}
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="font-weight-bold text-success">
                                    {list.tenPhim}
                                  </p>

                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(2,1fr)",
                                      gap: "15px",
                                    }}
                                  >
                                    {list.lstLichChieuTheoPhim
                                      .slice(0, 4)
                                      .map((film, index) => {
                                        if (localStorage.length === 1) {
                                          return (
                                            <>
                                              <NavLink
                                                to={`/checkout/${film.maLichChieu}`}
                                                key={index}
                                                style={{
                                                  color: "#9E9E9E",
                                                  width: "100%",
                                                  backgroundColor:
                                                    "rgba(246, 246, 246, 0.5)",
                                                  padding: "8px",
                                                  margin: "0 16px 16px 0",
                                                  border: "1px solid #e4e4e4",
                                                  borderRadius: "4px",
                                                }}
                                              >
                                                <span
                                                  style={{
                                                    color: "#108f3e",
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                  }}
                                                >
                                                  {moment(
                                                    film.ngayChieuGioChieu
                                                  ).format("DD-MM-YYYY")}
                                                </span>
                                                ~
                                                <span
                                                  style={{
                                                    color: "#fa5238",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  {moment(
                                                    film.ngayChieuGioChieu
                                                  ).format("hh:mm A")}
                                                </span>
                                              </NavLink>
                                            </>
                                          );
                                        } else {
                                          return (
                                            <>
                                              <NavLink
                                                to={`/sign__in`}
                                                key={index}
                                                style={{
                                                  color: "#9E9E9E",
                                                  width: "100%",
                                                  backgroundColor:
                                                    "rgba(246, 246, 246, 0.5)",
                                                  padding: "8px",
                                                  margin: "0 16px 16px 0",
                                                  border: "1px solid #e4e4e4",
                                                  borderRadius: "4px",
                                                }}
                                              >
                                                <span
                                                  style={{
                                                    color: "#108f3e",
                                                    fontWeight: "bold",
                                                    fontSize: "14px",
                                                  }}
                                                >
                                                  {moment(
                                                    film.ngayChieuGioChieu
                                                  ).format("DD-MM-YYYY")}
                                                </span>
                                                ~
                                                <span
                                                  style={{
                                                    color: "#fa5238",
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  {moment(
                                                    film.ngayChieuGioChieu
                                                  ).format("hh:mm A")}
                                                </span>
                                              </NavLink>
                                            </>
                                          );
                                        }
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane >
                  
                    );
                  })}
                </Tabs>
              </TabPane>

            );
          })}


        </Tabs>
      </div>
    </>
  );
};

export default TableListMovie;
