import express from "express";

import "dotenv/config";
import cors from "cors"
import mongoose from "mongoose"

import chatRoutes from "./routes/chat.js"
const app = express();
const port = 8080;

app.use(express.json())
app.use(cors());

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

