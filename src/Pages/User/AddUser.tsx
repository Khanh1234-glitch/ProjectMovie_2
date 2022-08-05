import React, { useEffect, useState } from "react";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { createUserType } from "../../slices/admin/User/UserTypeSlice";
import { createAddUser } from "../../slices/admin/User/AddUser";
type SizeType = Parameters<typeof Form>[0]["size"];

const AddUser = () => {
  const { data } = useSelector((state: RootState) => state.UserTypeSlice);
  const dispatch = useDispatch<any>();


  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      soDT: "",
      hoTen: "",
      matKhau: "",
      email: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: (values: any) => {
      console.log(values);
      let formData = new FormData();

      dispatch(createAddUser(formData))
    },
  });

  const handleChangeUserType = ()=>{
    dispatch(createUserType());
  }
  return (
    <div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tài khoản">
          <Input name="taiKhoan" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input name="matKhau" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input name="hoTen" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input name="soDT" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select
          onChange={handleChangeUserType}
            options={data?.map((type, index) => ({
              label: type?.tenLoai,
              value: type?.maLoaiNguoiDung,
            }))}
            placeholder="Chọn loại người dùng"
          />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button
            type="submit"
            className=" bg-primary border-0 text-light rounded px-3 py-2"
          >
            Thêm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
