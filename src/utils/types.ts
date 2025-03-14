export type Message = {
  id: number;
  author: string;
  authorId: string | null;
  content: string;
  createdTimestamp: number;
};
