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
type SizeType = Parameters<typeof Form>[0]["size"];

const AddFilm = () => {
  const [imgSrc, setImgSrc] = useState<any & string>("");
  const moment = require("moment");
  const dispatch = useDispatch<any>();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {} as string,
    },
    onSubmit: (values: any) => {
      console.log(values);
      // Tạo đối tượng formData
      const formData = new FormData();
      for (const key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("hinhAnh", values.hinhAnh, values.tenPhim.name);
        }
      }
      dispatch(createAddFilm(formData));
    },
  });
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const handleChangeDatePicker = (values: any) => {
    // console.log("obj:",moment(values).format("DD/MM/YYYY"));
    const premiereDate = moment(values).format("DD/MM/YYYY");
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
  const handleChangeFile = (event: any) => {
    // Lấy file từ event
    const file = event.target.files[0];
    if (
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      console.log("file", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImgSrc(event.target?.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }

  };
  return (
    <div>
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
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleNowShowing("dangChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleNowShowing("hot")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleNowShowing("sapChieu")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber onChange={handleChangeInputNumber("danhGia")} />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="
            image/jpg,
            image/gif,
            image/png,
            "
          />
          <br />
          <img
            style={{ width: "300px", height: "300px" }}
            src={imgSrc}
            alt="..."
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

export default AddFilm;
