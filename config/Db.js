import mongoose from "mongoose";

const dbConnect=async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected");
    
 } catch (error) {
    console.log("db error",error);
    
 }
}
export default dbConnect;