import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserType } from "@/types";

const initialState = {
  uid: "",
  email: "",
  phone: "",
  avatar: "",
  background: "",
  displayName: "",
  birthday: "",
  gender: "",
  status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserType> | null>) => ({
      ...state,
      ...initialState,
      ...action.payload,
    }),
    removeUser: () => ({
      ...initialState,
    }),
    updateUser: (state, action: PayloadAction<Partial<UserType> | null>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
