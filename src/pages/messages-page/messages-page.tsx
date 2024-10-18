import { Header } from "@/components/header/header";
import { CreateChat } from "@/components/create-chat/create-chat";
import { ChatsList } from "@/components/chats-list/chats-list";

import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { db } from "@/firebase";

type ChatsData = {
  image: string | null;
  members: string[];
  name: string;
  uid: string;
};

export function MessagesPage() {
  const user = useAppSelector(getUserSelector);
  const [chats, setChats] = useState<ChatsData[] | null>(null);

  const getPostByUid = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "chats"),
        where("members", "array-contains", user.uid)
      )
    );

    if (!querySnapshot.docs.length) {
      setChats([]);
      return;
    }

    let convertedData: ChatsData[] = [];
    querySnapshot.forEach((e) => convertedData.push(e.data() as ChatsData));
    setChats(convertedData);
  };

  useEffect(() => {
    const q = collection(db, "chats");
    onSnapshot(q, () => {
      getPostByUid();
    });
  }, []);

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
