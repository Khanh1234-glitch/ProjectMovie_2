import React, { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Input, Space } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { MovieManament } from "../../../slices/manamentMovie";
import { ManamentMovie } from "../../../interface/manamentCinema/ManamentMovie";
import { NavLink } from "react-router-dom";
import { CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddFilm from "./AddFilm";
import { createDeleteFilm } from "../../../slices/admin/deleteFilm";
import { useParams } from "react-router-dom";
import SearchFilm from "./SearchFilm";
const { Search } = Input;
// const onSearch = (value: string) => console.log(value);
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
//   maPhim?:number;
// }

const Film = () => {
  const { data } = useSelector((state: RootState) => state.manamentMovie);
  const dispatch = useDispatch<any>();
  const param = useParams();
  useEffect(() => {
    dispatch(MovieManament(param.evt));
  }, []);
  console.log("data", data);
  const columns: ColumnsType<ManamentMovie> = [
    {
      title: "Mã Phim",
      dataIndex: "Mã Phim",
      width: "10%",
      render(value, record, index) {
        return <span>{record.maPhim}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "Hình ảnh",
      width: "10%",
      render(value, record, index) {
        return <img width={50} src={record.hinhAnh} />;
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.maPhim - b.maPhim,
    },
    {
      title: "Tên phim",
      dataIndex: "Tên phim",
      width: "20%",
      render(value, record, index) {
        return <span>{record.tenPhim}</span>;
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
    },

    {
      title: "Mô tả",
      dataIndex: "Mô tả",
      width: "25%",
      render(value, record, index) {
        return (
          <span>
            {record.moTa.length > 50
              ? record.moTa.substring(0, 50) + "...."
              : record.moTa}
          </span>
        );
      },
      sorter: (a, b) => a.moTa.length - b.moTa.length,
      sortDirections: ["descend"],
      // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Hành động",
      dataIndex: "Hành động",
      width: "25%",
      render(value, record, index) {
        return (
          <div className="text-right">
            <NavLink
              className=" text-primary  "
              style={{ fontSize: "20px" }}
              to={`/admin/editfilm/${record.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            <button
              key={2}
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc muốn xóa phim " + record.tenPhim + " không ?"
                  )
                ) {
                  dispatch(createDeleteFilm(record.maPhim));
                }
              }}
              className=" text-danger ml-2 border-0 bg-white"
              style={{ fontSize: "20px", cursor: "pointer" }}
            >
              <DeleteOutlined />
            </button>
            <NavLink
              className=" text-success  ml-2"
              style={{ fontSize: "20px" }}
              to={`/admin/createcalendar/${record.maPhim}`}
            >
              <CalendarOutlined />
            </NavLink>
          </div>
        );
      },
      sorter: (a, b) => a.moTa.length - b.moTa.length,
      sortDirections: ["descend"],
      // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
  ];
  const dataSource = data;
  const onChange: TableProps<ManamentMovie>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="container">
      <h3>Quản lý phim</h3>
      <Button className="mb-5" type="primary" onClick={showModal}>
        Thêm phim
      </Button>
      <Modal
        title="Thêm phim"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddFilm />
      </Modal>
      <SearchFilm/>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
};

export default Film;
