import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../services/movieAPI";
import { Movie } from '../interface/movie';


interface MoviesState{
    data:Movie[] ,
    isLoading:boolean,
    error:string ,
}


const  initialState:MoviesState ={
    data:[],
    isLoading:false,
    error:"",
}

export const getMovieBanner = createAsyncThunk(
    "movies/getMovieBanner",
    async ()=>{
        try{
            const data=await movieAPI.getMovieBanner();
            return data;
        }catch (error){
            const err = (error as AxiosError).response?.data as any;
            throw err.content;
        }
    }
)

const movieSlice= createSlice({
    name:"movie",
    initialState,
    reducers:{},

    extraReducers:(builder)=> {
        builder.addCase(getMovieBanner.pending,(state)=>{
            return {...state, isLoading:true}
        });
        builder.addCase(getMovieBanner.fulfilled,(state, {payload})=>{
            return {...state, isLoading:false,data:payload}
        });
        builder.addCase(getMovieBanner.rejected,(state, {error})=>{
            return {...state, isLoading:false,error:error.message as string}
        });

    },

});

export default movieSlice.reducer;