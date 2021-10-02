const MessagesContainer = ({ messages, handleMsgEdit, handleMsgDelete }) => {
  return (
    <div className="messages-container">
      {messages.map((msg, index) => {
        return (
          <div key={index} className="message-container">
            {/* <p className="message-username">{msg.author}</p> */}
            <div className="message">
              <p className="message-text">{msg.content}</p>
              <div className="buttons">
                <button className="btn-edit" onClick={() => handleMsgEdit(msg)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleMsgDelete(msg.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesContainer;
