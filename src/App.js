import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// import { firebaseConfig } from "./config.json";
import MessagesContainer from "./components/MessagesContainer";
import { writeMessageData, deleteMessageData } from "./dbFunctions";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
initializeApp(firebaseConfig);

const database = getDatabase();

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log("signed in...");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(`${user.uid} is signed in`);
  } else {
    console.log("user is signed out");
  }
});

function App() {
  const [username, setUsername] = useState("anon");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [authorId, setAuthorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const messagesRef = ref(database, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const messageIds = Object.keys(data);
      const msgs = [];
      messageIds.forEach((messageId) => {
        msgs.push(data[messageId]);
      });
      setMessages(messages.concat(msgs));
      const messagesContainer = document.getElementById("msgs-container");
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      setIsLoading(false);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setAuthorId(uid);
      } else {
        console.log("user is signed out");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messagesContainer = document.getElementById("msgs-container");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [messages]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const addMessage = (event) => {
    event.preventDefault();
    const message = newMessage;
    if (!message) return;

    const timestamp = Date.now();
    const messageData = {
      id: timestamp,
      author: username,
      authorId: authorId,
      content: message,
      createdTimestamp: timestamp,
    };
    setMessages(messages.concat(messageData));
    setNewMessage("");
    writeMessageData(messageData, database);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleMsgEdit = (msg) => {
    setNewMessage(msg.content);
  };

  const handleMsgDelete = (msgId) => {
    setMessages(messages.filter((msg) => msg.id !== msgId));
    deleteMessageData(msgId, database);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <h1>SimpleChat</h1>
        </div>
        <div>
          <div className="username">
            <p className="username-label">Username:</p>
            <input
              className="username-input"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          <MessagesContainer
            messages={messages}
            handleMsgEdit={handleMsgEdit}
            handleMsgDelete={handleMsgDelete}
            isLoading={isLoading}
          />
          <div className="message-input">
            <form className="message-form" onSubmit={addMessage}>
              <input
                placeholder="Send message"
                onChange={handleMessageChange}
                value={newMessage}
              ></input>
              <button className="send-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
