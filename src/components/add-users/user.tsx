import { useState } from "react";

import { Avatar } from "@/components/avatar/avatar";
import { UserType } from "@/types";

import {
  AdminText,
  AvatarWrapper,
  Checkmark,
  RemoveButton,
  UserLine,
  UserName,
  UserNameWrapper,
  UserTag,
  Wrapper,
} from "./styled";

type UserProps = UserType & {
  handleCollectChildData?: Function;
  remove?: (uid: string, displayname: string) => void;
  isActive: boolean;
  isAdmin: boolean;
  clickable: boolean;
  removable: boolean;
  onUserClick?: (uid: string, displayname: string) => void;
};

export function User({
  clickable,
  removable,
  handleCollectChildData,
  isActive,
  isAdmin,
  remove,
  uid,
  displayName,
  email,
  avatar,
  onUserClick,
}: UserProps) {
  const [selected, setSelected] = useState<boolean>(isActive);

  const handleSelect = () => {
    if (!clickable) return;
    onUserClick && onUserClick(uid, displayName);
    if (!handleCollectChildData) return;
    handleCollectChildData(uid, !selected);
    setSelected((prev) => !prev);
  };

  const getClassName = () => {
    const res = [];
    if (selected) res.push("selected");
    if (clickable) res.push("clickable");
    return res.join(" ");
  };

  return (
    <Wrapper onClick={handleSelect} className={getClassName()}>
      <AvatarWrapper>
        <Avatar src={avatar} />
        <Checkmark
          className={selected ? "active" : ""}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
            fill="currentColor"
          />
        </Checkmark>
      </AvatarWrapper>
      <div>
        <UserNameWrapper>
          <UserName>{displayName}</UserName>
          {isAdmin && <AdminText> admin</AdminText>}
        </UserNameWrapper>

        <UserTag>{email}</UserTag>
        <UserLine />
      </div>
      {removable && remove && (
        <RemoveButton onClick={() => remove(uid, displayName)}>+</RemoveButton>
      )}
    </Wrapper>
  );
}
