import {createSlice} from "@reduxjs/toolkit";



const checkUser=()=>{
    if(localStorage.getItem('sb-edrmvftpxzwdwopgaueb-auth-token')===null){
    
        return {
            isAuthenticated:false,
            user:null
        }
    }else{
        return {
            isAuthenticated:true,
            user:JSON.parse(localStorage.getItem('sb-edrmvftpxzwdwopgaueb-auth-token')).user
        }
    }
}

const authSlice=createSlice({
    name:"auth",
    initialState:checkUser(),
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        logOut:(state)=>{
            state.isAuthenticated=false;
            state.user=null
        }

    }
});
export const {setUser,logOut} =authSlice.actions
export default authSlice.reducer