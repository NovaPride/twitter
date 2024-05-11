import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

import { db } from "@/firebase";
import { UserType } from "@/redux/slices/user-slice";

export const queryUserEqualByValue = async (field: string, value: string) => {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where(field, "==", value))
  );
  return querySnapshot;
};

export const getLoginFromEmailOrPhone = (
  queryEmailSnapshot: QuerySnapshot<DocumentData, DocumentData>,
  queryPhoneSnapshot: QuerySnapshot<DocumentData, DocumentData>
) => {
  let user = null;

  if (!queryEmailSnapshot.empty) {
    user = queryEmailSnapshot.docs[0].data();
  } else if (!queryPhoneSnapshot.empty) {
    user = queryPhoneSnapshot.docs[0].data();
  }

  return user;
};

export const adaptUserObj = (user: DocumentData | null): UserType => {
  return {
    uid: user?.uid ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    photoURL: user?.photoURL ?? "",
    displayName: user?.displayName ?? "",
    birthday: user?.birthday ?? "",
    gender: user?.gender ?? "",
    status: user?.status ?? "",
  };
};
