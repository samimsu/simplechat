import MessageContainer from "./MessageContainer";

const MessagesContainer = ({ messages, handleMsgEdit, handleMsgDelete }) => {
  return (
    <div className="messages-container">
      {messages.map((msg, index) => {
        let showUsername = true;
        if (
          index > 0 &&
          msg.authorId === messages[index - 1].authorId &&
          msg.author === messages[index - 1].author
        ) {
          showUsername = false;
        }
        return (
          <MessageContainer
            key={index}
            msg={msg}
            showUsername={showUsername}
            handleMsgEdit={handleMsgEdit}
            handleMsgDelete={handleMsgDelete}
          />
        );
      })}
    </div>
  );
};

export default MessagesContainer;
