import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../reducers/authReducer"
import imageReducer from "../reducers/imageReducer"

const store=configureStore({
   reducer:{
    auth:authReducer,
    image:imageReducer
   }
})

export default store