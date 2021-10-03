import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./config.json";
import MessagesContainer from "./components/MessagesContainer";
import { writeMessageData, deleteMessageData } from "./dbFunctions";

initializeApp(firebaseConfig);

const database = getDatabase();

// function writeMessageData(message) {
//   set(ref(database, "messages/" + message.id), {
//     id: message.id,
//     author: message.author,
//     content: message.content,
//     createdTimestamp: message.createdTimestamp,
//   });
// }

// function deleteMessageData(messageId) {
//   remove(ref(database, "messages/" + messageId));
// }

function App() {
  // const [username, setUsername] = useState("anon");
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
        msgs.push(data[messageId]);
      });
      setMessages(messages.concat(msgs));
      console.log("messages", messages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const changeUsername = (event) => {
  //   event.preventDefault();
  // };

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  const addMessage = (event) => {
    console.log("event", event);
    event.preventDefault();
    const message = newMessage;
    if (!message) return;

    const timestamp = Date.now();
    const messageData = {
      id: timestamp,
      // author: username,
      author: "anon",
      content: message,
      createdTimestamp: timestamp,
    };
    setMessages(messages.concat(messageData));
    setNewMessage("");
    console.log(messageData);
    writeMessageData(messageData, database);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleMsgEdit = (msg) => {
    setNewMessage(msg.content);
  };

  const handleMsgDelete = (msgId) => {
    console.log(msgId);
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
          {/* <div className="username">
            <p className="username-label">Username:</p>
            <form onSubmit={changeUsername}>
              <input
                className="username-input"
                value={username}
                onChange={handleUsernameChange}
              ></input>
            </form>
          </div> */}
          <MessagesContainer
            messages={messages}
            handleMsgEdit={handleMsgEdit}
            handleMsgDelete={handleMsgDelete}
          />
          <div className="message-input">
            <form onSubmit={addMessage}>
              <input
                placeholder="Send message"
                onChange={handleMessageChange}
                value={newMessage}
              ></input>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
