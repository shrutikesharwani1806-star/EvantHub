import mongoose from "mongoose";


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connection established : ${conn.connection.name}`.bgGreen.white)
    } catch (error) {
        console.log(`DB connection failed : ${error.message}`.bgRed.white)
    }
}

export default connectDB