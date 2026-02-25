import express from "express";

import "dotenv/config";
import cors from "cors"
import mongoose from "mongoose"

import chatRoutes from "./routes/chat.js"
const app = express();
const port = 8080;

app.use(express.json())
const corsOptions = {
  // REMOVE the trailing slash at the end of the URL
  origin: 'https://intellichat-sigma.vercel.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api",chatRoutes)

app.listen(port,()=>{
        console.log("Server running on 8080 port")
        connectDb();
})

const connectDb = async()=>{
   try{
    await mongoose.connect(process.env.mongoDb_url)
    console.log("connected successfully ")
   }catch(err){
     console.log(err);
   }
  
}

app.post("/test",async(req,res)=>{
     
})

