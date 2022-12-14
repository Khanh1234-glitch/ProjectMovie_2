import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { Cascader } from "antd";
import { DatePicker, Space } from "antd";
import { InputNumber } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { asyncCalendarFilm } from "../../../slices/admin/CalendarFilm";
import { NavLink, useParams } from "react-router-dom";
import { createInfoClusterForCinema } from "../../../slices/admin/infoClusterCinema";
import { useFormik } from "formik";
import moment from "moment";
import { createShowTime } from "../../../slices/admin/showTimeSlice";

const CreateCalender = () => {

  const { data } = useSelector((state: RootState) => state.CalendarFilm);
  const { cluster } = useSelector(
    (state: RootState) => state.infoClusterCinema
  );
  console.log(cluster);
  const param = useParams();

  const formik = useFormik({
    initialValues: {
      maPhim:param.id,
      ngayChieuGioChieu:'',
      maRap:'',
      giaVe:''
    },
    onSubmit:(values)=>{
      console.log(values);
      dispatch(createShowTime(values))
    }
  })
  
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(asyncCalendarFilm());
  }, []);

  useEffect(() => {
    // dispatch(createInfoClusterForCinema(handleChangeSystem));
  }, []);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const handleChangeSystem = (values: any) => {
    dispatch(createInfoClusterForCinema(values));

    // console.log(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeInpuNumber = (value: any) => {
    formik.setFieldValue('giaVe',value)
  };
  const handleChangeCluster = (value: any) => {
    formik.setFieldValue('maRap',value)
  };
  const onOk = (values: any) => {
    formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log('values',moment(values).format('DD/MM/YYYY hh:mm:ss'));
  };
  const onChangeDate = (values:any)=>{
    formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    console.log('values',moment(values).format('DD/MM/YYYY hh:mm:ss'));
  }
  return (
    <div className="mt-5 ">
      <h1>T???o l???ch chi???u</h1>
      <Form
      onSubmitCapture={formik.handleSubmit}
        className="container"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="H??? th???ng r???p">
          <Select
            options={data?.map((system, index) => ({
              label: system.tenHeThongRap,
              value: system.maHeThongRap,
            }))}
            onChange={handleChangeSystem}
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item label="C???m r???p">
          <Select
            options={cluster?.map((cluster, index) => ({
              label: cluster.tenCumRap,
              value: cluster.maCumRap,
            }))}
            onChange={handleChangeCluster}
            placeholder="Please select"
          />
        </Form.Item>
        <Form.Item label="Ng??y chi???u gi??? chi???u">
          <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>
        <Form.Item label="Gi?? v??">
          <InputNumber min={75000} max={150000} onChange={onChangeInpuNumber} />
        </Form.Item>
        <Form.Item label="Ch???c n??ng">
          <Button htmlType="submit">T???o l???ch chi???u</Button>
        </Form.Item>
        <Form.Item className="text-right " label="">
          <Button className="bg-success text-white border-0 rounded" htmlType="submit"><NavLink to="/">Quay v??? trang ch???</NavLink></Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCalender;
