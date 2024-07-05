import React from 'react';

const messages = [
  { username: "Jack", message: "Nice" },
  { username: "Rock", message: "This is amazing event." },
  { username: "Janny", message: "This is what an event looks like, full of vibe and fun." },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  { username: "Username", message: "Message" },
  // Add more messages as needed
];

const Chat = () => {
  return (
    <aside className="chat-column">
      <div className="chat-container">
        <div className="chat-header">
          <h2 className="chat-title">Chat</h2>
          <button className="chat-options">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a053037e49bdc51defc878be5aa30e87cf2d06b7bce7d310dac4cd6f34fe145?apiKey=f7a84a3244c847b980b62828a7d406c5&"
              alt="Chat options"
              className="chat-options-icon"
            />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index}>
              <span className="chat-username">{msg.username}</span>
              <p className="chat-message">{msg.message}</p>
            </div>
          ))}
        </div>
        <form className="chat-input">
          <label htmlFor="chatMessage" className="visually-hidden">
            Send a message
          </label>
          <input
            type="text"
            id="chatMessage"
            className="chat-input-field"
            placeholder="Send a message"
          />
          <button type="submit" className="chat-send-btn">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5edffdc6cda039c1441e86517cb51ad0f5761b15fc182c16dc094d900a6a1ef?apiKey=f7a84a3244c847b980b62828a7d406c5&"
              alt="Send message"
              className="chat-send-icon"
            />
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Chat;
