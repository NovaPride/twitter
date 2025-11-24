import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { updatePassword, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ErrorsSummary } from "@/components/errors/errors-summary";
import { FormError } from "@/components/errors/form-error";
import { GENDERS } from "@/constants/genders";
import { ROUTES } from "@/constants/routes";
import { auth, db } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { removeUser } from "@/redux/slices/user-slice";
import { ModalComponentProps } from "@/types";
import { Button } from "@/ui/buttons";
import { Input } from "@/ui/inputs";
import { Select } from "@/ui/selects";
import { queryUserEqualByValue, reauthUser } from "@/utils/firebase/helpers";

import { schema } from "./form-schema";
import { StyledFormProfile, Text } from "./styled";

type Data = {
  displayName: string;
  gender: string;
  status: string;
  currentPassword: string;
  newPassword: string;
};

export function EditProfile({ handleModalClose }: ModalComponentProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { displayName, gender, status, uid, accountType } =
    useAppSelector(getUserSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      displayName: displayName,
      gender: gender,
      status: status,
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Data) => {
    try {
      if (accountType && accountType === "google") {
        navigate(ROUTES.AUTH);
      } else {
        navigate(ROUTES.LOGIN);
      }
      await reauthUser(data.currentPassword);
      const userSnapshot = await queryUserEqualByValue("uid", uid);
      const userRef = doc(db, "users", userSnapshot.docs[0].id);

      dispatch(removeUser());
      updateDoc(userRef, {
        displayName: data.displayName,
        gender: data.gender,
        status: data.status,
      });
      updateProfile(auth.currentUser!, {
        displayName: data.displayName,
      });
      data.newPassword &&
        data.currentPassword &&
        updatePassword(auth.currentUser!, data.newPassword);
      handleModalClose();
      toast.success("Succesfully changed!");
    } catch (error) {
      toast.error("Something went wrong...");
      if (accountType && accountType === "google") return;
      if (error instanceof FirebaseError) {
        navigate(ROUTES.PROFILE);
      }
    }
  };

  return (
    <StyledFormProfile onSubmit={handleSubmit(onSubmit)}>
      <Text>Edit your profile</Text>
      <Input {...register("displayName")} type="text" placeholder="Name" />
      {accountType && accountType !== "google" && (
        <>
          <FormError inputFor={errors.displayName} />
          <Input
            {...register("currentPassword")}
            type="password"
            placeholder="Current password"
          />
          <FormError inputFor={errors.currentPassword} />
          <Input
            {...register("newPassword")}
            type="password"
            placeholder="New password"
          />
          <FormError inputFor={errors.newPassword} />
        </>
      )}

      <Select {...register("gender")} options={GENDERS} />
      <FormError inputFor={errors.gender} />
      <Input {...register("status")} type="text" placeholder="Status" />
      <FormError inputFor={errors.status} />
      <ErrorsSummary errors={errors as FieldErrors} />
      <Button type="submit" variant="primary" size="large">
        Edit
      </Button>
    </StyledFormProfile>
  );
}
