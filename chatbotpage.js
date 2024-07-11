// src/components/ChatbotPage.js
import React, { useState } from 'react';
import axios from 'axios';

function ChatbotPage() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('https://1e60-34-85-150-201.ngrok-free.app/chat', { query });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
            setError(`Error fetching response. Please try again later. ${error.response ? error.response.data : error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button type="submit">Send</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && <p>{response}</p>}
        </div>
    );
}

export default ChatbotPage;
