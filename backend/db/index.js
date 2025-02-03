import mongoose from 'mongoose'

import { DB_NAME } from '../constants.js'

const connectDB = async ( ) => {
    
    try {
        const connectionInstance = await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`connection to the database is successfull || connected to DB-HOST ${connectionInstance.connection.port}`)

    } catch (error) {
        console.error("DB CONNCTION ERROR :: ",error)
        process.exit(1)
    }
}

export default connectDB