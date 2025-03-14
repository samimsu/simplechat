import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import Title from "./components/Title";
import Username from "./components/Username";
import MessagesContainer from "./components/MessagesContainer";
import MessageInput from "./components/MessageInput";
import { writeMessageData, deleteMessageData } from "./dbFunctions";
import type { Message } from "./utils/types";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
initializeApp(firebaseConfig);

const database = getDatabase();

function App() {
  const [username, setUsername] = useState("anon");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    const messagesRef = ref(database, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      if (!data) return;
      const messageIds = Object.keys(data);
      const msgs: Message[] = [];
      messageIds.forEach((messageId) => {
        msgs.push(data[messageId]);
      });
      setMessages(messages.concat(msgs));
      const messagesContainer = document.getElementById("msgs-container");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
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
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const addMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const message = newMessage.trim();
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

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleMsgEdit = (msg: Message) => {
    setNewMessage(msg.content);
  };

  const handleMsgDelete = (msgId: number) => {
    setMessages(messages.filter((msg) => msg.id !== msgId));
    deleteMessageData(msgId, database);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title />
        <div>
          <Username
            username={username}
            handleUsernameChange={handleUsernameChange}
          />
          <MessagesContainer
            messages={messages}
            handleMsgEdit={handleMsgEdit}
            handleMsgDelete={handleMsgDelete}
            isLoading={isLoading}
          />
          <MessageInput
            addMessage={addMessage}
            handleMessageChange={handleMessageChange}
            newMessage={newMessage}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
