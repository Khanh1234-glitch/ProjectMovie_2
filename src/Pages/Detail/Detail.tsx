import { Tabs } from "antd";
// import React, { useEffect, useState } from "react";
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { createInfoCinema } from "../../slices/infoListCinema";
import { RootState } from "../../store";
import "./../../index.css";
import styles from "./Detail.module.css";

type TabPosition = "left" | "right" | "top" | "bottom";
const { TabPane } = Tabs;
const Detail = () => {
  const {data, isLoading, error} = useSelector(
    (state:RootState)=>state.infoListCinema
  )
  const moment = require("moment");
  const param = useParams();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(createInfoCinema(param.movieId));
  }, []);
  console.log(data);

  // console.log(param.movieId);
  const [tabPosition, setTabPosition] = useState<TabPosition>("left");
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${data?.hinhAnh})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className={styles.App}>
          <div className={styles.box1}>
            <div className="container cols-12 ">
              <div className="row" style={{ marginTop: "30vh" }}>
                <div className="col-sm-6 col-xl-4 col-lg-4">
                  <img src={data?.hinhAnh} width={"200px"} alt="" />
                </div>
                <div className="col-sm-6 col-xl-4 col-lg-4" >
                  <p>{data?.tenPhim}</p>
                  <p>
                    {data?.moTa?.length > 50
                      ? data?.moTa.substring(0, 50) + "..."
                      : data?.moTa}
                  </p>
                </div>
                <div className="circle firchow col-lg-4">
                  <div className="c100 p50 big">
                    <span>{data?.danhGia}%</span>
                    <div className="slice">
                      <div className="bar" />
                      <div className="fill" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs
              defaultActiveKey="1"
              centered
              style={{ backgroundColor: "#fff" }}
            >
              <TabPane tab="Lịch chiếu" key="1">
                <div className="container tab__detail mt-5">
                  <Tabs tabPosition={tabPosition} className="bg-white">
                    {data && data?.heThongRapChieu?.map((item, index) => {
                      return (
                        <TabPane
                          tab={
                            <div>
                              <img src={item.logo} width={50} height={50} />
                              {item.tenHeThongRap}
                            </div>
                          }
                          key={index}
                        >
                          {item && item?.cumRapChieu.map((group, index) => {
                            return (
                              <div key={index}>
                                <div className="groupDetail mt-5 d-flex">
                                  <div className="img_GroupDetail">
                                    <img
                                      src={group.hinhAnh}
                                      width={70}
                                      alt=""
                                    />
                                  </div>
                                  <div className="groupName__Detail ml-5 ">
                                    <p className="font-weight-bold fs-5">
                                      {group.tenCumRap}
                                    </p>
                                    <p>{group.diaChi}</p>
                                  </div>
                                </div>
                                <div className="row ">
                                  {group?.lichChieuPhim?.map(
                                    (calendar,index) => {
                                      return (
                                        <NavLink
                                          to={`/checkout/${calendar.maLichChieu}`}
                                          className="col-3 text-primary"
                                        >
                                          {moment(
                                            calendar.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    }
                                  )}
                             
                                </div>
                              </div>
                            );
                          })}
                        </TabPane>
                      );
                    })}
                    
                  </Tabs>
                </div>
              </TabPane>
              <TabPane tab="Thông tin" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Đánh giá" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
