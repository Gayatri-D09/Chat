import React, { useState } from 'react';
import './ChatScreen.css';

function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);

  const handleSubmit = async (question = null) => {
    const messageText = question || inputText;
    if (!messageText.trim()) return;

    const userMessage = { sender: 'user', text: messageText };
    setConversation([...conversation, userMessage]);

    if (!question) {
      setInputText('');
    }

    const greetings = ['hello', 'hi'];
    if (greetings.includes(messageText.toLowerCase())) {
      const botMessage = { sender: 'bot', text: 'Hello, how can I help you?' };
      setConversation((prev) => [...prev, botMessage]);
      return;
    }

    try {
      const response = await fetch('https://4ec9-34-122-41-229.ngrok-free.app/api/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: messageText }),
      });

      const data = await response.json();
      console.log(data.response); // Log the response to check its content

      const botMessage = { sender: 'bot', text: data.response };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = { sender: 'bot', text: 'Error fetching data. Please try again later.' };
      setConversation((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat Screen</h1>
      <div className="chat-box">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
}

export default ChatScreen;
