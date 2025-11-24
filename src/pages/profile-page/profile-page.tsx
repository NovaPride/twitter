import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Profile } from "@/components/profile/profile";
import { TweetsList } from "@/components/tweets-list/tweets-list";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { getAdditionalUserDataByUid } from "@/utils/firebase/helpers";

export type UserType = {
  uid: string;
  email: string;
  phone: string;
  displayName: string;
  avatar?: string;
  background?: string;
  birthday?: string;
  gender?: string;
  status?: string;
};

export function ProfilePage() {
  const user = useAppSelector(getUserSelector);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<UserType>({
    uid: "",
    email: "",
    avatar: "",
    background: "",
    phone: "",
    displayName: "",
    status: "",
  });

  useEffect(() => {
    if (user.uid === id) {
      navigate(ROUTES.PERSONA);
    }

    const errorCallback = () => {
      toast.error("User not found");
      navigate(ROUTES.PROFILE);
    };

    getAdditionalUserDataByUid(id!, errorCallback).then((data) => {
      setData(data as UserType);
    });
  }, [id, user]);

  return (
    <>
      <Profile
        displayName={data.displayName}
        avatar={data.avatar!}
        background={data.background!}
        status={data.status}
        email={data.email}
      />
      <TweetsList filterFunc={(post) => post.authorUid === id} />
    </>
  );
}
