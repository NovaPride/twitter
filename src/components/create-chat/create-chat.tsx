import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { FieldErrors, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { Button } from "@/ui/buttons";
import { uploadFile } from "@/utils/firebase/helpers";

import { useModalControls } from "@/hooks/use-modal-controls";

import { Modal } from "../modal/modal";
import { ModalPortal } from "../modal/modal-portal";

import { CreateChatModal } from "./create-chat-modal";

import {
  CreateChatWrapper,
  MainText,
  DescrText,
  CreateChatHeaderButton,
} from "./styled";

type Data = {
  content: string;
  image: FileList | null;
};
//не забыть убирать Independed если есть хоть 1 диалог
export function CreateChat({
  type = "independed",
}: {
  type?: "header" | "independed";
}) {
  // const user = useAppSelector(getUserSelector);
  const { showModal, handleModalShow, handleModalClose } = useModalControls();

  useEffect(() => {
    handleModalClose();
  }, [location]);

  return (
    <>
      {
        {
          header: (
            <CreateChatHeaderButton onClick={handleModalShow}>
              +
            </CreateChatHeaderButton>
          ),
          independed: (
            <CreateChatWrapper>
              <MainText>Welcome to your inbox!</MainText>
              <DescrText>
                Drop a line, share posts and more with private conversations
                between you and others.
              </DescrText>

              <Button variant="primary" size="large" onClick={handleModalShow}>
                Create new Chat
              </Button>
            </CreateChatWrapper>
          ),
        }[type]
      }
      {showModal && (
        <ModalPortal
          children={<Modal onClose={handleModalClose}><CreateChatModal /></Modal>}
        />
      )}
    </>
  );
}
