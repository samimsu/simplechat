import MessageContainer from "./MessageContainer";

const MessagesContainer = ({ messages, handleMsgEdit, handleMsgDelete }) => {
  return (
    <div className="messages-container">
      {messages.map((msg, index) => {
        return (
          <MessageContainer
            key={index}
            msg={msg}
            handleMsgEdit={handleMsgEdit}
            handleMsgDelete={handleMsgDelete}
          />
        );
      })}
    </div>
  );
};

export default MessagesContainer;
