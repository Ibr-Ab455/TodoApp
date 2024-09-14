import mongoose from "mongoose";

const connectDB = async () => {
 try{
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MONGODB Connected`)
 }catch (error){
  console.log(error)
  process.exit(1);
 }
}

export default connectDB;