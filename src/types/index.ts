import { Timestamp } from "firebase/firestore";
import { DocumentData as __DocumentData } from "firebase/firestore";

export type DocumentData = __DocumentData;

export type UserBasicType = {
  uid: string;
  displayName: string;
}

export type UserType = UserBasicType & {
  email: string;
  avatar?: string;
  phone?: string;
  background?: string;
  birthday?: string;
  gender?: string;
  status?: string;
  accountType?: "firebase" | "google";
};

export type UsersList = UserType[];

export type ChatData = {
  createAt: Timestamp;
  image: string;
  members: string[];
  name: string;
  uid: string;
};

export type ChatsDataList = ChatData[];

export type MessageData = {
  authorUid: string;
  createdAt: Timestamp;
  image?: string;
  content: string;
  uid: string;
};

export type MessagesDataList = MessageData[];

export type PostData = {
  authorUid: string;
  bookmarkedByUsers: string[];
  content: string;
  createdAt: Timestamp;
  image?: string;
  likedByUsers: string[];
  likes: number;
  uid: string;
};

export type PostsDataList = PostData[];

export type PostFormData = {
  content: string;
  image: FileList | null;
};

export type ChatsData = {
  createdAt: Timestamp;
  image: string | null;
  members: string[];
  name: string;
  uid: string;
  admin: string;
};

export type ImageProps = {
  src?: string;
};

export type ModalComponentProps = {
  handleModalClose: Function;
};

export type FileType = Blob | Uint8Array | ArrayBuffer | null;

export type ThemeType = {
  theme: string;
};