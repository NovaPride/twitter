import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

import noAvatar from "@/assets/imgs/no_avatar.svg";
import { NAVIGATION_LINKS } from "@/constants/nav-links";
import { logOut } from "@/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { setUser } from "@/redux/slices/user-slice";
import { Button } from "@/ui/buttons";
import { adaptUserObj } from "@/utils/firebase/helpers";

import { Avatar } from "../avatar/avatar";
import { CreatePost } from "../create-post/create-post";
import { Logo } from "../logo/logo";
import { Modal } from "../modal/modal";
import { ModalPortal } from "../modal/modal-portal";
import {
  AvatarWrapper,
  ButtonWrapper,
  LogoWrapper,
  NavList,
  NavListItemImage,
  NavListItemLink,
  UserBlock,
  UserCard,
  UserName,
  UserTag,
  UserWrapper,
  Wrapper,
} from "./styled";

export function Navigation() {
  const { showModal, handleModalShow, handleModalClose } = useModalControls();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOutClick = () => {
    logOut().then(() => {
      dispatch(setUser(adaptUserObj(null)));
      navigate("/login");
    });
  };

  return (
    <>
      <Wrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <nav>
          <NavList>
            {NAVIGATION_LINKS.map(({ label, to, icon, isEnabled }) => (
              <Fragment key={label}>
                <NavListItemLink to={to} $isEnabled={isEnabled}>
                  <NavListItemImage src={icon} alt={label} />
                  {label}
                </NavListItemLink>
              </Fragment>
            ))}
          </NavList>
        </nav>
        <ButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={handleModalShow}
          >
            Tweet
          </Button>
        </ButtonWrapper>

        <UserWrapper>
          <UserCard>
            <AvatarWrapper>
              <Avatar src={noAvatar} />
            </AvatarWrapper>
            <UserBlock>
              <UserName>Bober</UserName>
              <UserTag>@bober_kurwa</UserTag>
            </UserBlock>
          </UserCard>
          <ButtonWrapper>
            <Button
              variant="secondary"
              size="large"
              type="button"
              onClick={handleLogOutClick}
            >
              Log out
            </Button>
          </ButtonWrapper>
        </UserWrapper>
      </Wrapper>
      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <CreatePost />
            </Modal>
          }
        />
      )}
    </>
  );
}
