import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

const url=`https://pixabay.com/api/?key=${import.meta.env.VITE_API_KEY}`;

export const fetchImages=createAsyncThunk('fetch/image',async(query="")=>{
    console.log(query)
    const res=await axios.get(`${url}&q=${query}`);
    return res.data;
})

const imageSlice=createSlice({
    name:"image",
    initialState:{
        status:null,
        data:null,
        error:null,
        searchquery:""
    },
    reducers:{
        setQuery:(state,action)=>{
            state.searchquery=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchImages.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchImages.fulfilled,(state,action)=>{
            state.status="success";
            state.data=action.payload
        })
        builder.addCase(fetchImages.rejected,(state,action)=>{
            state.status="failed";
            console.log(action.error);
            state.error=action.error.message
        })
    }
    
})

export const{setQuery} =imageSlice.actions;

export default imageSlice.reducer;
