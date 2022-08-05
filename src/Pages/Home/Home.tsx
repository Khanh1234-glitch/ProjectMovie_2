import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Carousel from "../../Components/Carousel";
import CarouselItem from "../../Components/CarouselItem";
import Footer from "../../Components/Footer";
import TableListMovie from "../../Components/TableListMovie";
import UngDung from "../../Components/UngDung";
import { getMovieBanner } from "../../slices/movies";
import { RootState } from "../../store";
const Home = () => {
  return (
    <>
    <Carousel/>
    <CarouselItem/>
    <TableListMovie/>
    <UngDung/>
    <Footer/>
    </>
  )
}

export default Home