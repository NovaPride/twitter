import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthFirebaseError } from "@/components/errors/auth-error";
import { FormError } from "@/components/errors/form-error";
import { Logo } from "@/components/logo/logo";
import { MONTHS, YEARS } from "@/constants/dates";
import { ROUTES } from "@/constants/routes";
import { auth, db } from "@/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/redux/slices/user-slice";
import { Button } from "@/ui/buttons";
import { Input } from "@/ui/inputs";
import { InlineLink } from "@/ui/links";
import { Select } from "@/ui/selects";
import { authErrorsHandler } from "@/utils/firebase/auth-errors-handler";
import { queryUserEqualByValue } from "@/utils/firebase/helpers";
import { getDaysFromMonth } from "@/utils/get-days-from-month";

import { schema } from "./form-schema";
import {
  Background,
  ButtonWrapper,
  FormWrapper,
  Header1,
  Header2,
  LogoWrapper,
  SelectWrapper,
  Text,
} from "./styled";

type Data = {
  displayName: string;
  phone: string;
  email: string;
  password: string;
  year: string;
  month: string;
  day: string;
};

export function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Data) => {
    try {
      const queryPhoneSnapshot = await queryUserEqualByValue(
        "phone",
        data.phone
      );
      if (queryPhoneSnapshot?.docs[0]?.data()) {
        throw new Error("phone-in-use");
      }

      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        const userCreds = userCredential.user;

        const newUser = {
          uid: userCreds.uid,
          avatar: "",
          background: "",
          phone: data.phone,
          email: data.email,
          displayName: data.displayName,
          birthday: new Date(
            Number(data.year),
            Number(MONTHS.indexOf(data.month)),
            Number(data.day)
          ).toString(),
          accountType: "firebase" as const,
        };

        Promise.all([
          addDoc(collection(db, "users"), newUser),
          dispatch(setUser(newUser)),
        ]);

        navigate(ROUTES.HOME);
      });
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        setError(authErrorsHandler(error.code));
      } else if (error instanceof Error && error.message === "phone-in-use") {
        setError(authErrorsHandler("phone-in-use"));
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Header1>Create an account</Header1>
      <Input {...register("displayName")} type="text" placeholder="Name" />
      <FormError inputFor={errors.displayName} />
      <Input {...register("phone")} type="text" placeholder="Phone number" />
      <FormError inputFor={errors.phone} />
      <Input {...register("email")} type="text" placeholder="Email" />
      <FormError inputFor={errors.email} />
      <Input {...register("password")} type="password" placeholder="Password" />
      <FormError inputFor={errors.password} />
      <InlineLink to={ROUTES.AUTH}>Use email</InlineLink>
      <Header2>Date of birth</Header2>
      <Text>
        Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit.
        Quis bibendum ante phasellus metus, magna lacinia sed augue. Odio enim
        nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
        dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
      </Text>
      <SelectWrapper>
        <Select {...register("year")} placeholder="Years" options={YEARS} />
        <Select {...register("month")} placeholder="Months" options={MONTHS} />
        <Select
          {...register("day")}
          placeholder="Days"
          options={getDaysFromMonth(
            +watch("year"),
            MONTHS.indexOf(watch("month"))
          )}
        />
      </SelectWrapper>
      <FormError inputFor={errors.year} />
      <FormError inputFor={errors.month} />
      <FormError inputFor={errors.day} />
      <AuthFirebaseError errorText={error} />
      <ButtonWrapper>
        <Button type="submit" variant="primary" size="large">
          Next
        </Button>
      </ButtonWrapper>
      <Background />
    </FormWrapper>
  );
}