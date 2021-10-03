import { ref, set, remove } from "firebase/database";

export function writeMessageData(message, database) {
  set(ref(database, "messages/" + message.id), {
    id: message.id,
    author: message.author,
    content: message.content,
    createdTimestamp: message.createdTimestamp,
  });
}

export function deleteMessageData(messageId, database) {
  remove(ref(database, "messages/" + messageId));
}
