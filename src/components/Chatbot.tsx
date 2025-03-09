import React, { useState, useRef, useEffect } from 'react';
import { HfInference } from '@huggingface/inference';
// import { } from "@huggingface/inference"a
import { HUGGING_FACE_TOKEN } from '../config';
import './Chatbot.css';

// Initialize Hugging Face client
const hf = new HfInference(HUGGING_FACE_TOKEN);

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatCompletionResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

const INITIAL_MESSAGE: Message = {
    role: 'assistant',
    content: 'Hello! I\'m BloodSync Assistant. How can I help you with blood donation or blood requests today?'
};

const cleanResponse = (response: string): string => {
    // Remove thinking tags and their content
    response = response.replace(/<think>.*?<\/think>/gs, '');
    
    // Remove any remaining HTML-like tags
    response = response.replace(/<[^>]*>/g, '');
    
    // Clean up any double spaces or unnecessary whitespace
    response = response.replace(/\s+/g, ' ').trim();
    
    return response;
};

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const chatCompletion = await hf.chatCompletion({
                model: "deepseek-ai/DeepSeek-R1",
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant for BloodSync Life, a blood donation platform. Provide direct responses without thinking tags or HTML formatting. Focus on blood donation, blood requests, and related services.'
                    },
                    ...messages,
                    userMessage
                ].map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                provider: "nebius",
                max_tokens: 500,
            }) as ChatCompletionResponse;

            const responseContent = chatCompletion?.choices?.[0]?.message?.content;
            
            if (responseContent) {
                const cleanedResponse = cleanResponse(responseContent);
                const assistantMessage: Message = {
                    role: 'assistant',
                    content: cleanedResponse
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('Error in chat completion:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>BloodSync Assistant</h2>
            </div>
            
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                    >
                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="message assistant-message">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                />
                <button type="submit" disabled={isTyping || !input.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;