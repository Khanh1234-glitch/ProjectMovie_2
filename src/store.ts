import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import  manamentMovie  from './slices/manamentMovie';
// import thunk from 'redux-thunk'
// import  CheckoutStore  from './slices/checkout';
import movieList from "./slices/moviesList";
import  addFilm  from "./slices/addFilm";
import movie from "./slices/movies";
import infoSystem from './slices/infoSystem'
import auth from "./slices/auth";
import register from "./slices/register";
import infoListCinema from "./slices/infoListCinema";
import CheckoutStore from './slices/checkout'
import editFilm from "./slices/admin/editFilm";
import CalendarFilm from "./slices/admin/CalendarFilm";
import infoClusterCinema from "./slices/admin/infoClusterCinema";
import ManamentListUser from './slices/admin/User/ManamentListUser';
import UserTypeSlice from "./slices/admin/User/UserTypeSlice";
const store = configureStore({
  reducer: {
    movie,
    movieList,
    infoSystem,
    auth,
    register,
    infoListCinema,
    CheckoutStore,
    manamentMovie,
    addFilm,
    editFilm,
    CalendarFilm,
    infoClusterCinema,
    ManamentListUser,
    UserTypeSlice
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
