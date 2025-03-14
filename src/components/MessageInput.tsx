type MessageInputProps = {
  addMessage: (e: React.FormEvent) => void;
  handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newMessage: string;
};

const MessageInput = ({
  addMessage,
  handleMessageChange,
  newMessage,
}: MessageInputProps) => {
  return (
    <div className="message-input">
      <form className="message-form" onSubmit={addMessage}>
        <input
          placeholder="Send message"
          onChange={handleMessageChange}
          value={newMessage}
        />
        <button className="send-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
