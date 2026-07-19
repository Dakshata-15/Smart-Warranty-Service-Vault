import React, { useState } from "react";
import "./ChatAssistant.css";

function ChatAssistant() {

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (question.trim() === "") return;

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await fetch("http://localhost:8080/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain"
                },

                body: question

            });

            const data = await response.text();

            const aiMessage = {

                sender: "ai",

                text: data

            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: "Unable to connect to SmartVault AI."

                }

            ]);

        }

        setLoading(false);

        setQuestion("");

    };

    return (

        <div className="chat-page">

            <div className="chat-container">

                <div className="chat-header">

                    SmartVault AI Assistant

                </div>

                <div className="chat-body">

                    {messages.length === 0 && (

                        <div className="welcome">

                            <br />
                               💬 Start asking questions about your products, warranties, invoices, and documents.

                        </div>

                    )}

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "user"
                                    ? "user-message"
                                    : "ai-message"
                            }
                        >

                            {msg.text}

                        </div>

                    ))}

                    {loading && (

                        <div className="typing">

                            <span></span>
                            <span></span>
                            <span></span>

                        </div>

                    )}

                </div>

                <div className="chat-footer">

                    <input

                        type="text"

                        placeholder="Ask SmartVault AI..."

                        value={question}

                        onChange={(e) => setQuestion(e.target.value)}

                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                sendMessage();

                            }

                        }}

                    />

                    <button onClick={sendMessage}>

                        Send

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ChatAssistant;