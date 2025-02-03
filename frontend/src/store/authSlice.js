import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    authStatus: JSON.parse(localStorage.getItem("authStatus")) || false,
    userData : JSON.parse(localStorage.getItem("userData")) || {},
};



const authSlice = createSlice ( {
    name : "auth" ,
    initialState , 
    reducers : {
        login : (state , action ) => {
            state.authStatus = true 
            state.userData = action.payload
            

        },
        logout : (state,action)=>{
            state.authStatus = false
            state.userData = null
           

        },
        updateProfile : (state,action)=>{
            state.userData = action.payload
        }
    }
} )

export const {login , logout , updateProfile} = authSlice.actions
export default authSlice.reducer