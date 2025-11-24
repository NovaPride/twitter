import { UserType } from "@/types";

type State = {
  userReducer: UserType;
};

export const getUserSelector = (state: State) => state.userReducer;
export const getUserIdSelector = (state: State) => state.userReducer.uid;
