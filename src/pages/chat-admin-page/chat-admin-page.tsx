import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import addMedia from "@/assets/icons/add-media.svg";
import { AddUsers } from "@/components/add-users/add-users";
import { Avatar } from "@/components/avatar/avatar";
import { Header } from "@/components/header/header";
import { Modal } from "@/components/modal/modal";
import { ModalPortal } from "@/components/modal/modal-portal";
import { UploadModal } from "@/components/upload-modal/upload-modal";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useAddUsersControls } from "@/hooks/use-add-users-controls";
import { useModalControls } from "@/hooks/use-modal-controls";
import { usePurge } from "@/hooks/use-purge";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { ChatsData } from "@/types";
import { Button } from "@/ui/buttons";
import { Time } from "@/ui/time";

import {
  AddButtonAvatar,
  AddButtonText,
  AddUserButtonWrapper,
  AvatarWrapper,
  AvatarWrapperWithChange,
  ChatWrapper,
  CreatedAt,
  ImageUpload,
  InformationWrapper,
  MembersCount,
  MembersWrapper,
  Name,
} from "./styled";

export function ChatAdminPage() {
  const { id } = useParams();
  const user = useAppSelector(getUserSelector);
  const { handleCollectChildData } = useAddUsersControls();
  const purge = usePurge();
  const { showModal, handleModalShow, handleModalClose } = useModalControls();
  const [chat, setChat] = useState<ChatsData | null>(null);
  const [freeze, setFreeze] = useState<boolean>(false);
  const {
    showModal: showAvatarModal,
    handleModalShow: handleAvatarModalShow,
    handleModalClose: handleAvatarModalClose,
  } = useModalControls();

  const [chatName, setChatName] = useState("");

  useEffect(() => {
    const getChatByUid = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "chats"), where("uid", "==", id))
      );

      if (!querySnapshot.docs.length) purge("chatDoesNotExist");

      const chatData: ChatsData = querySnapshot.docs[0].data() as ChatsData;

      if (!chatData.members.includes(user.uid)) purge("userNotInChat");

      if (user.uid !== chatData.admin) purge("notAnAdmin");

      setChat(chatData);
      setChatName(chatData.name);
    };

    const q = collection(db, "chats");
    onSnapshot(q, () => {
      getChatByUid();
    });
  }, [id, user.uid]);

  const handleRemove = async (uid: string, displayname: string) => {
    try {
      if (!chat) return;
      setFreeze(true);
      const newMembers = chat.members.filter((member) => member !== uid);

      const chatRef = doc(db, "chats", chat.uid);
      await updateDoc(chatRef, {
        members: newMembers,
      });
      toast.success(`${displayname} kicked!`);
      setFreeze(false);
    } catch (error) {
      toast.error(`Something went wrong!`);
      setFreeze(false);
    }
  };

  const handleAdd = async (uid: string, displayname: string) => {
    try {
      if (!chat) return;
      setFreeze(true);
      const newMembers = [...chat.members, uid];

      const chatRef = doc(db, "chats", chat.uid);
      await updateDoc(chatRef, {
        members: newMembers,
      });
      toast.success(`${displayname} added!`);

      setFreeze(false);
      handleModalClose();
    } catch (error) {
      toast.error(`Something went wrong!`);
      setFreeze(false);
      handleModalClose();
    }
  };

  const handleChatNameChange = () => {
    {
      try {
        if (!chat) return;
        if (chatName.length > 30) {
          toast.error("Chat name is longer than 30 characters!");
          return;
        }
        if (chatName.trim().length === 0 || chatName.length < 3) {
          toast.error("Chat name must contain at least three characters!");
          return;
        }
        const chatRef = doc(db, "chats", chat.uid);
        updateDoc(chatRef, {
          name: chatName,
        });
        toast.success(`Chat name changed!`);
      } catch (error) {
        toast.error(`Something went wrong!`);
      }
    }
  };

  return (
    <>
      <ChatWrapper>
        <Header
          titleOnClick={handleModalShow}
          title={chat ? `Admin Panel` : ""}
        />

        {chat && (
          <>
            <InformationWrapper>
              <AvatarWrapperWithChange onClick={handleAvatarModalShow}>
                <AvatarWrapper>
                  <Avatar src={chat.image!} />
                </AvatarWrapper>
                <ImageUpload src={addMedia} alt="upload file" />
              </AvatarWrapperWithChange>

              <Name
                type="text"
                value={chatName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setChatName(e.target.value);
                }}
              ></Name>
              <CreatedAt>
                <Time
                  seconds={chat.createdAt.seconds}
                  textBefore="Created at "
                />
              </CreatedAt>
              <MembersCount>{`${chat.members.length} members`}</MembersCount>
              <Button
                type="button"
                variant="primary"
                size="small"
                style={
                  chatName === chat.name
                    ? {
                        display: "none",
                      }
                    : {}
                }
                onClick={handleChatNameChange}
              >
                Save
              </Button>
            </InformationWrapper>
            <MembersWrapper>
              <AddUsers
                handleCollectChildData={handleCollectChildData}
                adminId={chat.admin}
                showOnly={chat.members}
                style={{
                  marginBottom: "0",
                }}
                remove={handleRemove}
                freeze={freeze}
              />
              <AddUserButtonWrapper onClick={handleModalShow}>
                <AddButtonAvatar>+</AddButtonAvatar>
                <AddButtonText>Add users</AddButtonText>
              </AddUserButtonWrapper>
            </MembersWrapper>
          </>
        )}
      </ChatWrapper>
      {showModal && chat && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <AddUsers
                exclude={chat.members}
                onUserClick={handleAdd}
                style={{
                  marginBottom: "0",
                }}
                freeze={freeze}
                clickable
              />
            </Modal>
          }
        />
      )}
      {showAvatarModal && (
        <ModalPortal
          children={
            <Modal onClose={handleAvatarModalClose}>
              <UploadModal
                handleModalClose={handleAvatarModalClose}
                uploadType="image"
                table="chats"
                id={id!}
                placeholder="You can change group avatar here."
                toastMessage="Avatar updated"
              />
            </Modal>
          }
        />
      )}
    </>
  );
}
