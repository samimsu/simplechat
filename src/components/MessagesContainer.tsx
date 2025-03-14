import MessageContainer from "./MessageContainer";
import loadingIcon from "../assets/loading.svg";
import type { Message } from "../utils/types";

type MessagesContainerProps = {
  messages: Message[];
  handleMsgEdit: (msg: Message) => void;
  handleMsgDelete: (msgId: number) => void;
  isLoading: boolean;
};

const MessagesContainer = ({
  messages,
  handleMsgEdit,
  handleMsgDelete,
  isLoading,
}: MessagesContainerProps) => {
  return (
    <div id="msgs-container" className="messages-container">
      {isLoading ? <img src={loadingIcon} alt="loading icon" /> : ""}
      {messages.map((msg, index) => {
        console.log("msg", msg);
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
