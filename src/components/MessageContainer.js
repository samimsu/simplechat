import { getAuth } from "firebase/auth";

const MessageContainer = ({ msg, handleMsgEdit, handleMsgDelete }) => {
  const auth = getAuth();
  return (
    <div className="message-container">
      <p className="message-username">
        <strong>{msg.author}</strong>
      </p>
      <div className="message">
        <p className="message-text">{msg.content}</p>
        <div className="buttons">
          <button className="btn-edit" onClick={() => handleMsgEdit(msg)}>
            Edit
          </button>
          {auth.currentUser.uid === msg.authorId ? (
            <button
              className="btn-delete"
              onClick={() => handleMsgDelete(msg.id)}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
