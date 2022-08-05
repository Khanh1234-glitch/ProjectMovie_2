import React, { useEffect, useState } from "react";
import { useFormik, FormikProps } from "formik";
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
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { createAddFilm } from "../../../slices/addFilm";
import { AddFilmInterface } from "../../../interface/interfaceAdmin/AddFilmInterface";
import { Link, NavLink, useParams } from "react-router-dom";
import { createEditFilm } from "../../../slices/admin/editFilm";
import moment from "moment";
import { createEditFilmUpdate } from "../../../slices/admin/editFilmUpdate";
type SizeType = Parameters<typeof Form>[0]["size"];

const EditFilm = () => {
  const { data } = useSelector((state: RootState) => state.editFilm);
  console.log("chinh sua", data);

  const [imgSrc, setImgSrc] = useState<any & string>("");

  const dispatch = useDispatch<any>();

  const param = useParams();
  useEffect(() => {
    dispatch(createEditFilm(param.id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: data?.maPhim,
      tenPhim: data?.tenPhim,
      trailer: data?.trailer,
      moTa: data?.moTa,
      ngayKhoiChieu: data?.ngayKhoiChieu,
      dangChieu: data?.dangChieu,
      sapChieu: data?.sapChieu,
      hot: data?.hot,
      danhGia: data?.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values: any) => {
      console.log(values);
      // Tạo đối tượng formData
      const formData = new FormData();
      // formData.append("tenPhim", values.tenPhim);
      for (const key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(createEditFilmUpdate(formData));
    },
  });
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const handleChangeDatePicker = (value: any) => {
    // console.log("obj:",moment(values).format("DD/MM/YYYY"));
    const premiereDate = moment(value);
    formik.setFieldValue("ngayKhoiChieu", premiereDate);
  };
  const handleNowShowing = (name: any) => {
    return (values: any) => {
      formik.setFieldValue(name, values);
    };
  };
  const handleChangeInputNumber = (name: any) => {
    return (values: any) => {
      formik.setFieldValue(name, values);
    };
  };
  const handleChangeFile = async (event: any) => {
    // Lấy file từ event
    const file = event.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      // Tạo đối tượng đọc file
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        console.log(event.target?.result);
        setImgSrc(event.target?.result);
      };
    }
  };

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h1>Chỉnh sửa phim</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
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
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"YYYY/MM/DD"}
            onChange={handleChangeDatePicker}
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleNowShowing("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleNowShowing("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleNowShowing("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif"
          />
          <img
            style={{ width: "300px", height: "300px" }}
            src={imgSrc === "" ? data.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button
            type="submit"
            className=" bg-primary border-0 text-light rounded px-3 py-2"
          >
            Sửa
          </button>
        </Form.Item>
      </Form>
      <div className="text-right">
        <button className="border-0  bg-primary p-3 rounded">
          <NavLink className="text-light " to="/admin">
            Quay về trang admin
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default EditFilm;
