import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { firebaseConfig } from "./config.json";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
// console.log(app);

const database = getDatabase();

function writeMessageData(message) {
  set(ref(database, "messages/" + message.id), {
    id: message.id,
    author: message.author,
    content: message.content,
    createdTimestamp: message.createdTimestamp,
  });
}

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "messages/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("messages data", data);
      const messageIds = Object.keys(data);
      console.log(messageIds);
      const msgs = [];
      messageIds.forEach((messageId) => {
        msgs.push(data[messageId].content);
      });
      setMessages(messages.concat(msgs));
      console.log("messages", messages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = (event) => {
    console.log("event", event);
    event.preventDefault();
    const message = newMessage;
    if (!message) return;
    setMessages(messages.concat(message));
    setNewMessage("");
    const timestamp = Date.now();
    const messageData = {
      id: timestamp,
      author: "unknown",
      content: message,
      createdTimestamp: timestamp,
    };
    console.log(messageData);
    writeMessageData(messageData);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">SimpleChat</h1>
        <div>
          <div className="messages-container">
            {messages.map((msg, index) => {
              return (
                <p className="message" key={index}>
                  {msg}
                </p>
              );
            })}
          </div>
          <form onSubmit={addMessage}>
            <input
              className="message-input"
              placeholder="Send message"
              onChange={handleMessageChange}
              value={newMessage}
            ></input>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
