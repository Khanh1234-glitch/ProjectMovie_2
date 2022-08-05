import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { GlobalStyles } from "./GlobalStyle";
import Home from "./Pages/Home/Home";
import MainTemplate from "./Templates/MainTemplate";
import LogIn from "./Pages/Log/LogIn";
import Register from "./Pages/Register/Register";
import Detail from "./Pages/Detail/Detail";
import Checkout from "./Pages/Checkout/Checkout";
import AdminTemplate from "./Templates/AdminTemplate";
import Film from "./Pages/Admin/Film/Film";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import ShowTime from "./Pages/Admin/ShowTime/ShowTime";
import EditFilm from "./Pages/Admin/Film/EditFilm";
import CreateCalendar from "./Pages/Admin/Film/CreateCalendar";

// import Checkout from "./Pages/Checkout/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route index element={<Home />} />
          <Route path="/sign__in" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:movieId" element={<Detail />} />
          <Route path="/checkout/:maLichChieu" element={<Checkout />} />
          <Route path="/admin" element={<AdminTemplate />}>
            <Route path="/admin/film" element={<Film />} />
            <Route index element={<Dashboard />} />
            <Route path="/admin/showtime" element={<ShowTime />} />
          </Route>
        </Route>
        <Route path="/admin/editfilm/:id" element={<EditFilm />} />
        <Route path="/admin/createcalendar/:id" element={<CreateCalendar />} />
        
{/* nó không có ở đây anh */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      <GlobalStyles />
    </>
  );
}

export default App;
