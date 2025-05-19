import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
  username: string;
  image: string | null;
  role_id: string;
  address: string;
};

type UserState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;