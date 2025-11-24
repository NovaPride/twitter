import { signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import googleIcon from "@/assets/icons/google-icon.svg";
import { Logo } from "@/components/logo/logo";
import { ROUTES } from "@/constants/routes";
import { auth, db, googleProvider } from "@/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { useAppSelector } from "@/hooks/redux";
import { getThemeSelector } from "@/redux/selectors/theme-selectors";
import { setUser } from "@/redux/slices/user-slice";
import { UserType } from "@/types";
import { Button } from "@/ui/buttons";
import { InlineLink } from "@/ui/links";
import { adaptUserObj, queryUserEqualByValue } from "@/utils/firebase/helpers";

import {
  AuthWrapper,
  Background,
  ButtonWrapper,
  Header1,
  Header2,
  LoginText,
  LogoWrapper,
  PolicyText,
  ProfileWrapper,
  Wrapper,
} from "./styled";

export function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getThemeSelector);

  const handleSignupClick = () => {
    navigate(ROUTES.SIGNUP);
  };

  const handleSignupWithGoogleClick = async () => {
    await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
      const user = userCredential.user;
      const { uid, phoneNumber, email, displayName } = user;

      let newUser: UserType = {
        uid: uid,
        avatar: "",
        background: "",
        phone: phoneNumber || "",
        email: email!,
        displayName: displayName!,
        accountType: "google",
      };

      const queryUserSnapshot = await queryUserEqualByValue("uid", uid);

      if (queryUserSnapshot.empty) {
        await addDoc(collection(db, "users"), newUser);
      } else {
        const additionalData = queryUserSnapshot.docs[0].data();
        newUser = { ...newUser, ...additionalData };
      }

      dispatch(setUser(adaptUserObj(newUser)));
    });

    navigate(ROUTES.HOME);
  };

  return (
    <ProfileWrapper>
      <div className="gridInterface">
        <Wrapper>
          <AuthWrapper>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <div>
              <Header1>Happening now</Header1>
              <Header2>Join Twitter today</Header2>
              <ButtonWrapper>
                <Button
                  icon={googleIcon}
                  variant="outlined"
                  size="large"
                  onClick={handleSignupWithGoogleClick}
                >
                  Sign up with Google
                </Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleSignupClick}
                >
                  Sign up with Email
                </Button>
              </ButtonWrapper>
              <PolicyText>
                By singing up you agree to the
                <InlineLink to="#"> Terms of Service</InlineLink> and
                <InlineLink to="#"> Privacy Policy</InlineLink>, including
                <InlineLink to="#"> Cookie Use</InlineLink>.
              </PolicyText>
              <LoginText>
                Already have an account?
                <InlineLink to={ROUTES.LOGIN}> Log in</InlineLink>
              </LoginText>
            </div>
          </AuthWrapper>
        </Wrapper>
        <Background $bgname={theme} />
      </div>
    </ProfileWrapper>
  );
}
