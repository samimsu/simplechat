import MessageContainer from "./MessageContainer";
import loadingIcon from "../assets/loading.svg";

const MessagesContainer = ({
  messages,
  handleMsgEdit,
  handleMsgDelete,
  isLoading,
}) => {
  return (
    <div id="msgs-container" className="messages-container">
      {isLoading ? <img src={loadingIcon} alt="loading icon" /> : ""}
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
