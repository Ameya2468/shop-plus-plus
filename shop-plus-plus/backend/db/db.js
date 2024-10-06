import mongoose from "mongoose";

const connectToDb=async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To Mongodb Database ${conn.connection.host}`);
    }catch(error){
        console.log(`Mongodb Error ${error}`);
    };
}

export default connectToDb;