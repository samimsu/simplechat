const MessageInput = ({ addMessage, handleMessageChange, newMessage }) => {
  return (
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
  );
};

export default MessageInput;
