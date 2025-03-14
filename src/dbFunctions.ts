import { ref, set, remove } from "firebase/database";
import type { Database } from "firebase/database";
import type { Message } from "./utils/types";

export function writeMessageData(message: Message, database: Database) {
  set(ref(database, `messages/${message.id}`), {
    id: message.id,
    author: message.author,
    authorId: message.authorId,
    content: message.content,
    createdTimestamp: message.createdTimestamp,
  });
}

export function deleteMessageData(messageId: number, database: Database) {
  remove(ref(database, `messages/${messageId}`));
}
