import { useState } from 'react'
import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from './ChatWindow.jsx';
import {v1 as uuidv1} from "uuid";
import {MyContext} from "./MyContext.jsx";
function App() {
    const [prompt,setPrompt] = useState("");
    const [reply,setReply]= useState(null);
    const [currThreadId , setCurrThreadId]= useState(uuidv1())
    const [prevChats , setPrevChats] = useState([]) // stores all chats of curr threads
    const [newChat , setNewChat] = useState(true);
    const [allThreads,setAllThreads] = useState([]);

    const providerValues ={
      prompt , setPrompt,
      reply , setReply,
      currThreadId ,setCurrThreadId,
      newChat , setNewChat,
      prevChats , setPrevChats,
      allThreads , setAllThreads
    }// passing Values

  return (
    <div className='app'>
        <MyContext.Provider value={providerValues}>
         <Sidebar/>
         <ChatWindow />
         </MyContext.Provider>
    </div>
  )
}

export default App
