import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AddUsers } from "@/components/add-users/add-users";
import { Chat } from "@/components/chat/chat";
import { Header } from "@/components/header/header";
import { Modal } from "@/components/modal/modal";
import { ModalPortal } from "@/components/modal/modal-portal";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { usePurge } from "@/hooks/use-purge";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { ChatsData } from "@/types";

import { ChatWrapper } from "./styled";

export function ChatPage() {
  const { id } = useParams();
  const user = useAppSelector(getUserSelector);
  const purge = usePurge();
  const { showModal, handleModalShow, handleModalClose } = useModalControls();
  const [chat, setChat] = useState<ChatsData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getChatByUid = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "chats"), where("uid", "==", id))
      );

      if (!querySnapshot.docs.length) purge("chatDoesNotExist");

      const chatData: ChatsData = querySnapshot.docs[0].data() as ChatsData;

      if (!chatData.members.includes(user.uid)) purge("userNotInChat");

      setChat(chatData);
    };

    const q = collection(db, "chats");
    onSnapshot(q, getChatByUid);
  }, [id, user.uid]);

  const handleTitleClick = () => {
    const isAdminView = chat?.admin === user.uid;
    if (isAdminView) {
      navigate("./admin");
    } else {
      handleModalShow();
    }
  };

  return (
    <>
      <ChatWrapper>
        <Header
          title={chat ? `${chat.name}` : ""}
          titleOnClick={handleTitleClick}
          description={
            chat
              ? `${chat.members.length} ${chat.members.length > 1 ? "members" : "member"}`
              : ""
          }
        />
        {chat === null ? null : <Chat />}
      </ChatWrapper>
      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <AddUsers showOnly={chat!.members} adminId={chat!.admin} />
            </Modal>
          }
        />
      )}
    </>
  );
}
