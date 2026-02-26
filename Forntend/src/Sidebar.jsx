import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
   const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

   const getAllThreads = async () => {
      try {
         const response = await fetch("https://intellichat-1-44fc.onrender.com/api/thread");

         const res = await response.json();

         const filterData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }))
         // console.log(filterData);
         setAllThreads(filterData);
      } catch (err) {

      }
   };

   useEffect(() => {
      getAllThreads();
   }, [currThreadId])


   const createNewChat = () => {
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrThreadId(uuidv1());
      setPrevChats([]);
   }

   const changeThread = async (newthreadId) => {
      setCurrThreadId(newthreadId);

      try {
         const response = await fetch(`https://intellichat-1-44fc.onrender.com/api/thread/${newthreadId}`);

         const res = await response.json();

         setPrevChats(res.messages || []);
         setNewChat(false);
         setReply(null)
      } catch (err) {
         console.log(err);
      }

   }

   const deleteThread = async (threadId) => {
      try {
         const response = await fetch(`https://intellichat-1-44fc.onrender.com/api/thread/${threadId}`, { method: "DELETE" })
         const res = await response.json();
         console.log(res);
         //updated thread re-render

         setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

         if (threadId === currThreadId) {
            createNewChat();
         }

      } catch (err) {
         console.log(err);
      }
   }

   return (
      <section className="sidebar">

         <button onClick={createNewChat}>
            <img src="src/assets/blacklogo.png" alt="" className="logo" />
            <span><i className="fa-solid fa-pen-to-square"></i></span>
         </button>



         <ul className="history">
            {
               allThreads?.map((thread, idx) => (
                  <li key={idx} onClick={() => changeThread(thread.threadId)}>{thread.title}
                     <i className="fa-solid fa-trash" onClick={(e) => {
                        e.stopPropagation();
                        deleteThread(thread.threadId)
                     }}></i>
                  </li>

               ))
            }
         </ul>

         <div className="sign">
            <p>By Rahul &hearts;</p>
         </div>
      </section>
   );
}

export default Sidebar;