import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText() {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText('');
    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src="loading-spinner.gif" className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    

    const response = await Chatbot.getResponseAsync(inputText);
  setChatMessages([
    ...newChatMessages,
    {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID()
    }
  ])
  }
  

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
      }
    }

    function clearMessages() {
        setChatMessages([]);
    }


  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to ChatBot" 
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
      onClick={clearMessages}
      className="clear-button"
      >Clear</button>
    </div>
  );
}