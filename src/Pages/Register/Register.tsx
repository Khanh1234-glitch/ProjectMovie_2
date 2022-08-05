import { useForm, FieldErrors } from "react-hook-form";
import { TextInput, Button, Space, createStyles } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { CreateRegister } from "./../../slices/register";
import { FaRegistered } from "react-icons/fa";
import { Navigate } from "react-router-dom";


interface RegisterValues {
  taiKhoan: string;
  matKhau: string;
  email: string;
  hoTen: string;
}

const useStyle = createStyles(() => ({
  container__register: {
    padding: "32px",
    background:
      "url(https://tcdtist-tix-clone.vercel.app/static/media/backapp.b46ef3a1.jpg)",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  form__register: {
    width: "30%",
    display: "block",
    boxSizing: "border-box",
    margin: "0 0 50vh 60vh !important",
    transform: "translateY(30vh)",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "30px",
    padding: "10px 20px 20px 20px",
  },
}));
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: { taiKhoan: "", matKhau: "", email: "", hoTen: "" },
    // mode: cách để trigger validation, mặc định là onSubmit
    mode: "onTouched",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.register
  );
  // const taiKhoan= register("taiKhoan");
  // console.log(taiKhoan);
  const onSubmit = (values: RegisterValues) => {
    dispatch(CreateRegister(values));
  };
  const onError = (errors: FieldErrors<RegisterValues>) => {
    console.log(errors);
  };
  console.log("render");
  const { classes } = useStyle();
  // Kiểm tra current user có phải là object hay không nếu không phải là obj rỗng => user đã đăng ký
  if(Object.keys(currentUser).length)
  {
    return <Navigate to = "/sign__in" replace/>
  }
  return (
    <div className={classes.container__register}>
      <h1>Register</h1>
      <form
        className={classes.form__register}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div
          className="logo"
          style={{
            textAlign: "center",
            fontSize: "30px",
            color: "#fb4226",
          }}
        >
          <FaRegistered />
          <p style={{ fontWeight: "bold", color: "black", fontSize: "30px" }}>
            Đăng Ký
          </p>
        </div>
        <TextInput
          error={errors.taiKhoan?.message}
          label="Tài khoản"
          type="text"
          placeholder="Tài khoản"
          {...register("taiKhoan", {
            required: {
              value: true,
              message: "Tài khoản không được để trống",
            },
            pattern: {
              value: /^[a-zA-Z0-9]{4,20}$/,
              message:
                "Chỉ sử dụng từ 4 đến 20 kí tự, không được sử dụng kí tự đặc biệt và khoảng cách",
            },
          })}
        />
        <Space h="md" />
        <TextInput
          error={errors.matKhau?.message}
          label="Mật khẩu"
          type="password"
          placeholder="Mật khẩu"
          {...register("matKhau", {
            required: {
              value: true,
              message: "Mật khẩu không được để trống",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "có ít nhất 8 ký tự, trong đó có 1 kí tự số và 1 kí tự chữ",
            },
          })}
        />
        <Space h="md" />
        <TextInput
          error={errors.email?.message}
          label="Email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email không được để trống",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Chưa đúng cú pháp của Email !",
            },
          })}
        />
        <Space h="md" />
        <TextInput
          error={errors.hoTen?.message}
          label="Họ tên"
          type="text"
          placeholder="Họ tên"
          {...register("hoTen", {
            required: {
              value: true,
              message: "Họ tên không được để trống",
            },
            pattern: {
              value:
                /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/,
              message: "Phải ghi đầy đủ họ và tên đúng cú pháp trên giấy tờ",
            },
          })}
        />
        <Space h="md" />
        {error && <span>{error}</span>}
        <Space h="md" />
        <Button
          style={{
            width: "100%",
            fontWeight: "bold",
            backgroundColor: "#fb4226",
            border: "none",
          }}
          disabled={isLoading}
          type="submit"
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

export default Register;
