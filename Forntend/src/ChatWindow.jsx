import "./ChatWindow.css";
import Chat from "./Chat";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners"
function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } = useContext(MyContext)
    const [loading, setLoading] = useState(false);
    const getReply = async () => {
        setLoading(true);
        console.log(prompt, currThreadId)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };
        try {
            const response = await fetch("http://localhost:8080/api/chat", options)
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }

    // Append new Chat to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }
                ]
            ))
        }
        setPrompt("");
    }, [reply])


    return (
        <div className="chatWindow">
            <header className="navbar modern-navbar">
                <span className="brand">IntelliChat</span>
                <span className="userIcon"><i className="fa-solid fa-user"></i></span>
            </header>
            <main className="chatMain">
                <Chat />
                <div className="loader-container"> <ScaleLoader color="#339cff" loading={loading} height={18} /></div>
            </main>
            <footer className="chatInput modern-input">
                <div className="userInput">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />
                    <button id="submit" onClick={getReply} aria-label="Send">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
                <p className="info">IntelliChat can make mistakes. Check important info.</p>
            </footer>
        </div>
    );
}

export default ChatWindow;