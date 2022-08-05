import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieBanner } from "../slices/movies";
import { RootState } from "../store";
import IMG from "./../img/download.png";
// import { Carousel } from "react-bootstrap";
import { Movie } from "../interface/movie";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "100vh",
  width: "200%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const CarouselComponent = () => {
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.movie
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getMovieBanner());
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <Carousel afterChange={onChange}>
        {data &&
          data.map((movie:Movie) => {
            return (
                <div style={contentStyle}>
                  <img width={"100%"} height={"100%"} src={movie.hinhAnh} alt="" />
                </div>
              
            );
          })}

      </Carousel>
    </div>
  );
};

export default CarouselComponent;
