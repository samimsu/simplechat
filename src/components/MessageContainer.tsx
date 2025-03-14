import { getAuth } from "firebase/auth";
import { formatChatTimestamp } from "../utils/dateUtils";
import type { Message } from "../utils/types";

type MessageContainerProps = {
  msg: Message;
  showUsername: boolean;
  handleMsgEdit: (msg: Message) => void;
  handleMsgDelete: (msgId: number) => void;
};

const MessageContainer = ({
  msg,
  showUsername,
  handleMsgEdit,
  handleMsgDelete,
}: MessageContainerProps) => {
  const auth = getAuth();
  return (
    <div className="message-container">
      {showUsername ? (
        <p className="message-username">
          <strong>{msg.author}</strong>
        </p>
      ) : (
        ""
      )}
      <div className="message">
        <p className="message-text">{msg.content}</p>
        <div className="buttons">
          <p className="message-timestamp">
            {formatChatTimestamp(msg.createdTimestamp)}
          </p>
          <button className="btn-edit" onClick={() => handleMsgEdit(msg)}>
            Edit
          </button>
          {auth.currentUser && auth.currentUser.uid === msg.authorId ? (
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
