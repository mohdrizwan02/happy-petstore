import { configureStore } from '@reduxjs/toolkit'

import  authSlice  from './authSlice.js'
import petSlice from './petSlice.js'

const store = configureStore({
    reducer : {
        auth : authSlice,
        pet:petSlice,
    },  
})

export default store