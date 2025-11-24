import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Message } from "@/components/message/message";
import { db } from "@/firebase";
import { MessageData, MessagesDataList } from "@/types";

import { MessagesListContainer, ScrollWindow } from "./styled";

export const MessagesList = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<MessagesDataList | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = collection(db, "chats", id!, "messages");
    onSnapshot(q, () => {
      const getMessages = async () => {
        const querySnapshot = await getDocs(
          query(
            collection(db, "chats", id!, "messages"),
            orderBy("createdAt", "asc")
          )
        );
        if (!querySnapshot.docs[0]) return [];
        const messages: MessagesDataList = querySnapshot.docs.map(
          (doc) => doc.data() as MessageData
        );
        return messages;
      };
      getMessages().then((data: MessagesDataList) => {
        setMessages(data);
      });
    });
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <ScrollWindow>
      <MessagesListContainer>
        {messages === null
          ? ""
          : messages.map((data: MessageData, i) => {
              return <Message key={i} {...data} />;
            })}
        <div ref={messagesEndRef} />
      </MessagesListContainer>
    </ScrollWindow>
  );
};
