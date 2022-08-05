import axios, {AxiosError} from "axios";
import  store  from "./../store";
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMiIsIkhldEhhblN0cmluZyI6IjMwLzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2OTc2NjQwMDAwMCIsIm5iZiI6MTY0MTgzNDAwMCwiZXhwIjoxNjY5OTE0MDAwfQ.mTJaYLlwFuAG-SiC8fUlH-taW8wV0VAASxdCPf54RX8",
  },
});
interface ErrorResponse{
  content:string;
}
axiosClient.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error:AxiosError<ErrorResponse>) => {
    return Promise.reject(error.response?.data.content);
  }
);


// setup request interceptor
axiosClient.interceptors.request.use(
  (config)=>{
    // config là thông tin của request sẽ được gửi lên server
    const {accessToken}=store.getState().auth.currentUser;
    if(config.headers){
      if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
    // Kiểm tra xem user đã đăng nhập hay chưa để lấy accesstoken gẵn vào headers
  }
)



export default axiosClient;
