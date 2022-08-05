import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieList } from "../slices/moviesList";
import { RootState } from "../store";
import { useEffect } from "react";
import { createStyles, Pagination } from "@mantine/core";
import { Table } from "antd";
import {
  Link,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import style from "../Styles/styleCarouselItem.module.css";
import axios from "axios";
const useState = createStyles(() => ({
  container__card: {
    margin: "100px 0 0 50px ",
  },
  card: {
    width: "300px",
  },
  movieName: {
    display: "flex",
    color: "black",
    fontWeight: 500,
  },
  descripMovie: {
    color: "#757575",
    overflow: "hidden",
    display: "-webkit-box",
    opacity: 1,
    margin: "0 0 16px 0",
    visibility: "visible",
    lineHeight: "22px",
    textOverflow: "ellipsis",
  },

  span__nameMovie: {
    display: "inline-block",
    alignItems: "center",
    margin: " 10px 8px 0 0 ",
    padding: "5px 5px",
    minWidth: "33px",
    borderRadius: "4px",
    textAlign: "center",
    backgroundColor: "#fb4226",
    color: "black",
    fontWeight: 500,
    height: "50%",
  },
}));

const CarouselItem = () => {
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.movieList
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { classes, cx } = useState();
  const dispatch = useDispatch<any>();
  // searchParams được dùng để lưu trữ những giá trị mà có thể chia sẻ (thường là được sử dụng để
  // lưu trữ các giá trị filter ở page listing)
  // Hook useSearchParams return về 1 array gồm 2 phần tử
  // Phần tử thứ 1: obj chứa giá trị của search params trên url
  // Phần tử thứ 2: là 1 hàm dùng để thay đổi giá trị của search param trên url
  // console.log(searchParams.get("page"));
  useEffect(() => {
    dispatch(MovieList(1));
  }, [searchParams]);

  const changePage = (page: any) => {
    dispatch(MovieList(page));
  };

  return (
    <>
      <div className="container mb-5">
        <div className="contaner__movie">
          <div className="row">
            {data &&
              data.map((MovieList) => {
                return (
                  <div className="col-md-6 col-lg-4">
                    <div id="lichchieu" className={classes.container__card}>
                      <div className={classes.card}>
                        <div className={style.content__card}>
                          <div className="card__img">
                            <img
                              style={{ borderRadius: "30px" }}
                              width={"100%"}
                              height={"360px"}
                              src={MovieList.hinhAnh}
                              alt=""
                            />
                          </div>
                          <div className={style.title__card}>
                            <div className={style.container__title}>
                              <div className={classes.movieName}>
                                <span className={classes.span__nameMovie}>
                                  C18
                                </span>
                                <h3>{MovieList.tenPhim}</h3>
                              </div>
                              <div className="descripMovie">
                                <p className={classes.descripMovie}>
                                  {MovieList.moTa.length > 50
                                    ? MovieList.moTa.substring(0, 50) + "...."
                                    : MovieList.moTa}
                                </p>
                              </div>
                            </div>
                            <NavLink
                              className={style.btn__buyTicket}
                              to={`/detail/${MovieList.maPhim}`}
                            >
                              Mua vé
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="container mb-5 text-center">
        <button
          style={{ width: "30px", marginLeft: "10px" }}
          onClick={() => changePage(1)}
        >
          1
        </button>
        <button
          style={{ width: "30px", marginLeft: "10px" }}
          onClick={() => changePage(2)}
        >
          2
        </button>
        <button
          style={{ width: "30px", marginLeft: "10px" }}
          onClick={() => changePage(3)}
        >
          3
        </button>
        <button
          style={{ width: "30px", marginLeft: "10px" }}
          onClick={() => changePage(4)}
        >
          4
        </button>
      </div>
    </>
  );
};

export default CarouselItem;
