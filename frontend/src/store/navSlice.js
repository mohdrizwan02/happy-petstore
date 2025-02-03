import { createSlice } from "@reduxjs/toolkit";

initialState = {
    status:false
}


const navSlice = createSlice ({
    name:"nav",
    initialState,
    reducers:{
        toggle:(state,action) => {
            state.status=!state.status
        }
    }

})

export const { toggle } = navSlice.actions

export default navSlice.reducer