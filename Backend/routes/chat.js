import express from "express";

import Thread from "../models/Thread.js"

import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();

router.post("/test",async(req , res)=>{
    try{
       const thread = new Thread({
        threadId:"xyz",
        title:"Testing New Thread"
       });

       const response =await thread.save();
       res.send(response);
    }catch(err){
        console.log(err)
    }
})

router.get("/thread", async(req ,res)=>{
    try{
        const threads = (await Thread.find({}))
  .sort((a, b) => b.updatedAt - a.updatedAt);

        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Faild to Fetch Threads"})
    }
})

router.get("/thread/:threadId",async(req,res)=>{
    const{threadId} = req.params;
    try{
          let thread =await Thread.findOne({threadId})
          if(!thread){
               res.status(404).json({error:"Thread not found"});
          }
          res.json(thread)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Faild to Fetch Chat"})
    }
})

router.delete("/thread/:threadId",async(req,res)=>{
    const{threadId} = req.params;
    try{
         const deletedThread =await Thread.findOneAndDelete({threadId});
         if(!deletedThread){
            res.status(404).json({error:"Thread could not be deleted"})
         }
         res.status(200).json({success:"Deleted Successfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Faild to Delete Thread"})
    }
})

router.post("/chat",async(req,res)=>{
    const {threadId,message} = req.body;
    if(!threadId || !message){
        res.status(400).json({error:"missing require fields"})
    }
    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
           thread = new Thread ({
             threadId,
             title:message,
             messages:[{role:"user",content:message}]
           })
        }else{
            thread.messages.push({role:"user",content:message})
        }

        const assitantReply = await getOpenAIAPIResponse(message);
        
        thread.messages.push({role:"assistant",content:assitantReply})
        thread.updatedAt=new Date();

        await thread.save();
        res.json({reply:assitantReply})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Something went wrong"})
    }
})

export default  router;