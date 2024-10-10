import noAvatar from "@/assets/imgs/no_avatar.png";
import noBackground from "@/assets/imgs/no_background.webp";
import { auth } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { Button } from "@/ui/buttons";
import { Header } from "@/components/header/header";
import { Avatar } from "../avatar/avatar";
import { EditProfile } from "../edit-profile/edit-profile";
import { Modal } from "../modal/modal";
import { ModalPortal } from "../modal/modal-portal";
import {
  AvatarWrapper,
  EditButtonWrapper,
  ProfileBackgroundImage,
  ProfileBody,
  ProfileBodyName,
  ProfileBodyStatus,
  ProfileBodyTag,
  ProfileWrapper,
} from "./styled";

export function Profile() {
  const { showModal, handleModalShow, handleModalClose } = useModalControls();
  const user = useAppSelector(getUserSelector);

  return (
    <>
      <ProfileWrapper>
        <Header title={user.displayName} />
        <ProfileBackgroundImage src={noBackground} />
        <ProfileBody>
          <AvatarWrapper>
            <Avatar src={user.photoURL || noAvatar} />
          </AvatarWrapper>
          <EditButtonWrapper>
            <Button
              type="button"
              variant="outlined"
              size="small"
              onClick={handleModalShow}
            >
              Edit profile
            </Button>
          </EditButtonWrapper>
          <ProfileBodyName>{user.displayName}</ProfileBodyName>
          <ProfileBodyTag>{auth.currentUser?.email}</ProfileBodyTag>
          <ProfileBodyStatus>{user.status}</ProfileBodyStatus>
        </ProfileBody>
      </ProfileWrapper>

      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <EditProfile handleModalClose={handleModalClose} />
            </Modal>
          }
        />
      )}
    </>
  );
}
