import { useEffect, useState } from "react";

import { ROUTES } from "@/constants/routes";
import { UserBasicType } from "@/types";
import { getAdditionalUserDataByUid } from "@/utils/firebase/helpers";

import {
  KickButt,
  MemberNameLink,
  MemberTag,
  Wrapper,
} from "./styled";

type MemberProps = {
  id: string;
  adminId: string;
  isAdminView: boolean;
  handleMemberKickClick: (userData: UserBasicType) => void;
};

export function Member({
  id,
  adminId,
  isAdminView,
  handleMemberKickClick,
}: MemberProps) {
  const [userData, setUserData] = useState<UserBasicType>({
    uid: "",
    displayName: "",
  });

  useEffect(() => {
    getAdditionalUserDataByUid(id).then((data) =>
      setUserData(data as UserBasicType)
    );
  }, [id]);

  return (
    <>
      <Wrapper>
        <MemberNameLink to={`${ROUTES.PROFILE}/${id}`}>
          {userData.displayName ? userData.displayName : ""}
        </MemberNameLink>
        <MemberTag>{userData.uid === adminId ? "admin" : "member"}</MemberTag>
        {isAdminView && id !== adminId && (
          <KickButt onClick={() => handleMemberKickClick(userData)}>X</KickButt>
        )}
      </Wrapper>
    </>
  );
}
