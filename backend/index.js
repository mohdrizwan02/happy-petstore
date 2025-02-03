import dotenv from 'dotenv'

import connectDB from './db/index.js'

import { app } from './app.js'

dotenv.config()

connectDB()
.then(()=>{
    app.on('error',(error)=>{
        console.log("error occured while starting the app",error.message)
    })
    app.listen(process.env.PORT || 3000 , ()=>{
            console.log("Server is running and listening on port ",process.env.PORT)
           
    })

    
   
})
.catch((error)=>{
    console.log("error has occured",error)
})




