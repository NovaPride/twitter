import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { ChatsList } from "@/components/chats-list/chats-list";
import { CreateChat } from "@/components/create-chat/create-chat";
import { Header } from "@/components/header/header";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { ChatData } from "@/types";

export function MessagesPage() {
  const { uid } = useAppSelector(getUserSelector);
  const [chats, setChats] = useState<ChatData[] | null>(null);

  useEffect(() => {
    const q = collection(db, "chats");
    onSnapshot(q, () => {
      const getPostByUid = async () => {
        const querySnapshot = await getDocs(
          query(
            collection(db, "chats"),
            where("members", "array-contains", uid)
          )
        );

        if (!querySnapshot.docs.length) {
          setChats([]);
          return;
        }

        const convertedData: ChatData[] = [];
        querySnapshot.forEach((chat) =>
          convertedData.push(chat.data() as ChatData)
        );
        setChats(convertedData);
      };
      getPostByUid();
    });
  }, [uid]);

  return (
    <>
      <Header title="Messages" childrens={[<CreateChat type="header" />]} />
      {chats === null ? (
        <></>
      ) : chats.length > 0 ? (
        <ChatsList chats={chats} />
      ) : (
        <CreateChat type="independed" />
      )}
    </>
  );
}
