import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createListUser } from "../../slices/admin/User/ManamentListUser";
import { ListUser } from "../../interface/interfaceAdmin/User/ListUser";
import AddUser from "./AddUser";
import { createDeleteUser } from "../../slices/admin/User/DeleteUser";

const ManamentUser = () => {
  const { data } = useSelector((state: RootState) => state.ManamentListUser);
  const dispatch = useDispatch<any>();
  const param = useParams();
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

  useEffect(() => {
    dispatch(createListUser(param.evt));
  }, []);

  console.log("data", data);

  const columns: ColumnsType<ListUser> = [
    {
      title: "Họ tên",
      dataIndex: "Họ tên",
      width: "10%",
      render(value, record, index) {
        return <span>{record?.hoTen}</span>;
      },
      sorter: (a, b) => a?.hoTen?.length - b?.hoTen?.length,
      sortDirections: ["descend"],
    },
    {
      title: "Tài khoản",
      dataIndex: "Tài khoản",
      width: "10%",
      render(value, record, index) {
        return <span>{record?.taiKhoan}</span>;
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a?.taiKhoan?.length - b?.taiKhoan?.length,
    },
    {
      title: "Mật khẩu",
      dataIndex: "Mật khẩu",
      width: "20%",
      render(value, record, index) {
        return <span>{record?.matKhau}</span>;
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a?.matKhau?.length - b?.matKhau?.length,
    },

    {
      title: "Số điện thoại",
      dataIndex: "Số điện thoại",
      width: "25%",
      render(value, record, index) {
        return <span>{record?.soDT}</span>;
      },
      sorter: (a, b) => a?.soDT?.length - b?.soDT?.length,
      sortDirections: ["descend"],
      // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      render(value, record, index) {
        return <span>{record?.email}</span>;
      },
      sorter: (a, b) => a.email.length - b.email.length,
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
              to="/admin/editUser"
              className=" text-primary"
              style={{ fontSize: "20px", backgroundColor: "transparent" }}
            >
              <EditOutlined />
            </NavLink>
            <span className="mr-2 text-danger ">
              <button
                className="border-0 ml-2"
                style={{ fontSize: "20px", backgroundColor: "transparent" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Bạn có chắc muốn xóa " + record.hoTen + " không ?"
                    )
                  ) {
                    dispatch(createDeleteUser(record.taiKhoan))
                  }
                }}
              >
                <DeleteOutlined />
              </button>
            </span>
          </div>
        );
      },
    },
  ];
  const dataSource = data;
  const onChange: TableProps<ListUser>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="container">
      <h1 className="my-5">Quản lý người dùng</h1>
      <Button type="primary" className="mb-5" onClick={showModal}>
        Thêm người dùng
      </Button>
      <Modal
        title="Thêm người dùng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddUser />
      </Modal>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};

export default ManamentUser;
