import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import { Avatar } from "@/components/avatar/avatar";
import { CreatePost } from "@/components/create-post/create-post";
import { Logo } from "@/components/logo/logo";
import { Modal } from "@/components/modal/modal";
import { ModalPortal } from "@/components/modal/modal-portal";
import { NAVIGATION_LINKS } from "@/constants/nav-links";
import { ROUTES } from "@/constants/routes";
import { logOut } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { setUser } from "@/redux/slices/user-slice";
import { Button } from "@/ui/buttons";
import { adaptUserObj } from "@/utils/firebase/helpers";

import {
  AvatarWrapper,
  ButtonForSmolScreen,
  ButtonWrapper,
  LogOutButton,
  LogoWrapper,
  NavList,
  NavListItemImageWrapper,
  NavListItemLink,
  PopupContainer,
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
  const { avatar, displayName, email } = useAppSelector(getUserSelector);

  const handleLogOutClick = () => {
    logOut().then(() => {
      dispatch(setUser(adaptUserObj(null)));
      navigate(ROUTES.AUTH);
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
            {NAVIGATION_LINKS.map(({ label, to, svgCode, isEnabled }) => (
              <Fragment key={label}>
                <NavListItemLink
                  to={to}
                  $isEnabled={isEnabled}
                  onClick={
                    isEnabled
                      ? () => {}
                      : (event) => {
                          event.preventDefault();
                        }
                  }
                >
                  <NavListItemImageWrapper title={label}>
                    {svgCode}
                  </NavListItemImageWrapper>
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
        <ButtonForSmolScreen onClick={handleModalShow}>💬</ButtonForSmolScreen>
        <UserWrapper>
          <Popup
            className="menu-popup"
            trigger={
              <UserCard>
                <AvatarWrapper>
                  <Avatar src={avatar} />
                </AvatarWrapper>
                <UserBlock>
                  <UserName>{displayName}</UserName>
                  <UserTag>{email}</UserTag>
                </UserBlock>
              </UserCard>
            }
            position={["top center", "bottom center"]}
            arrow={true}
            offsetY={10}
          >
            <PopupContainer>
              <LogOutButton onClick={handleLogOutClick}>Log out</LogOutButton>
            </PopupContainer>
          </Popup>
        </UserWrapper>
      </Wrapper>
      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose} className="big">
              <CreatePost uid="sidebar"/>
            </Modal>
          }
        />
      )}
    </>
  );
}
