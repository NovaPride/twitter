import { memo, useEffect, useState } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { Modal } from "@/components/modal/modal";
import { ModalPortal } from "@/components/modal/modal-portal";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostData } from "@/types";
import { Time } from "@/ui/time";
import { getAdditionalUserDataByUid } from "@/utils/firebase/helpers";
import { getImageUrl } from "@/utils/firebase/helpers";

import Bookmark from "./interaction/bookmark";
import Like from "./interaction/like";
import More from "./more";
import {
  AvatarWrapperLink,
  BodyWrapper,
  Image,
  InteractionContainer,
  TweetText,
  UserInfoWrapper,
  UserNameLink,
  Wrapper,
} from "./styled";

type UserDataType = {
  avatar: string;
  displayName: string | null;
};

export const Tweet = memo(
  ({
    authorUid,
    bookmarkedByUsers,
    content,
    createdAt,
    image,
    likedByUsers,
    likes,
    uid,
  }: PostData) => {
    const { showModal, handleModalShow, handleModalClose } = useModalControls();

    const user = useAppSelector(getUserSelector);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserDataType>({
      avatar: "",
      displayName: null,
    });

    useEffect(() => {
      if (image) {
        getImageUrl(image)
          .then((url) => setImgUrl(url))
          .catch(() => setImgUrl(null));
      }
      getAdditionalUserDataByUid(authorUid).then((data) =>
        setUserData(data as UserDataType)
      );
    }, [authorUid, image, user.avatar]);

    const link = `${ROUTES.PROFILE}${user.uid !== authorUid ? `/${authorUid}` : ""}`;

    const toRender = (
      <Wrapper>
        <AvatarWrapperLink to={link}>
          <Avatar src={userData.avatar} />
        </AvatarWrapperLink>
        <BodyWrapper>
          <UserInfoWrapper>
            <UserNameLink to={link}>{userData.displayName}</UserNameLink>
            <Time seconds={createdAt.seconds} />
            {authorUid === user.uid && (
              <More
                uid={uid}
                image={image}
                authorUid={authorUid}
                content={content}
              />
            )}
          </UserInfoWrapper>
          <div onClick={handleModalShow}>
            <TweetText>{content}</TweetText>
            {imgUrl && <Image src={imgUrl} alt="tweet image" />}
          </div>
          <InteractionContainer>
            <Like uid={uid} likes={likes} likedByUsers={likedByUsers} />
            <Bookmark uid={uid} bookmarkedByUsers={bookmarkedByUsers} />
          </InteractionContainer>
        </BodyWrapper>
      </Wrapper>
    );

    return (
      <>
        {toRender}
        {showModal && (
          <ModalPortal
            children={
              <Modal onClose={handleModalClose} className="big">
                {toRender}
              </Modal>
            }
          />
        )}
      </>
    );
  }
);
