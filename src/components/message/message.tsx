import { useEffect, useState } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { MessageData, UserType } from "@/types";
import { Time } from "@/ui/time";
import { getAdditionalUserDataByUid } from "@/utils/firebase/helpers";
import { getImageUrl } from "@/utils/firebase/helpers";

import {
  AvatarWrapperLink,
  BodyWrapper,
  Image,
  MessageText,
  MessageWrapper,
  TimeText,
  UserInfoWrapperLink,
  UserName,
} from "./styled";

export const Message = ({
  authorUid,
  content,
  image,
  createdAt,
}: MessageData) => {
  const user = useAppSelector(getUserSelector);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<Partial<UserType>>({
    avatar: "",
    displayName: "",
  });

  useEffect(() => {
    if (image) {
      getImageUrl(image)
        .then((url) => setImgUrl(url))
        .catch(() => setImgUrl(null));
    }
    getAdditionalUserDataByUid(authorUid).then((data) =>
      setUserData(data as UserType)
    );
  }, [authorUid, image]);

  return (
    <MessageWrapper className={user.uid === authorUid ? "messageByUser" : ""}>
      <AvatarWrapperLink to={"/profile/" + authorUid}>
        <Avatar src={userData.avatar} />
      </AvatarWrapperLink>
      <BodyWrapper>
        <UserInfoWrapperLink to={"/profile/" + authorUid}>
          <UserName>{userData.displayName}</UserName>
        </UserInfoWrapperLink>
        <MessageText>{content}</MessageText>
        {imgUrl && <Image src={imgUrl} alt="tweet image" />}
        <TimeText>
          <Time seconds={createdAt.seconds} />
        </TimeText>
      </BodyWrapper>
    </MessageWrapper>
  );
};
