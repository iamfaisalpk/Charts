import { createSlice } from "@reduxjs/toolkit";

const getStoredCredentials = () => {
  try {
    const storedCredentials = localStorage.getItem("ISSUE_BOX_CREDENTIALS");

    if (!storedCredentials) {
      return null;
    }

    return JSON.parse(storedCredentials);
  } catch (error) {
    console.error("Failed to parse stored credentials", error);
    return null;
  }
};

const storedUser = getStoredCredentials();

const initialState = {
  id: storedUser?.id ?? null,
  email: storedUser?.email ?? null,
  role: storedUser?.role ?? null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null; 
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
