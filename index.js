import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from './config/Db.js'
import productRoutes from './routes/productRoute.js'
import fileupload from 'express-fileupload';
import cors from 'cors';

const app=express();
const port =process.env.PORT||5050;

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTED_URL,
    credentials:true
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
app.use('/api/v1/products',productRoutes)
app.listen(port,()=>{
    dbConnect()
    console.log('server started at port :',port);
    
})
