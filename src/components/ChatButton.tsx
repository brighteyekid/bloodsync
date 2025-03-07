import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import Chatbot from './Chatbot';
import './ChatButton.css';

const ChatButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
                {isOpen && (
                    <div className="chat-window">
                        <div className="chat-close-mobile">
                            <button 
                                onClick={toggleChat}
                                aria-label="Close chat"
                                className="close-button"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <Chatbot />
                    </div>
                )}
                <button 
                    className={`chat-button ${isOpen ? 'hidden-mobile' : ''}`}
                    onClick={toggleChat}
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    {isOpen ? <FaTimes /> : <FaComments />}
                </button>
            </div>
            {isOpen && <div className="chat-overlay" onClick={toggleChat} />}
        </>
    );
};

export default ChatButton; 