import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMeAction, LoginAction, RegisterAction } from "../action/UserAction";

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    users: {},
    authencated: false,
    loadedUser: false,
    error: false,
    user: {},
  },
  reducers: {
    register(state, action) {},
    login(state, action) {
      state.users = action.payload;
      state.authencated = true;
      state.error = false;
    },
    logout(state, action) {
      state.users = {};
      state.authencated = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.authencated = true;
      state.error = false;
    });
    builder.addCase(RegisterAction.rejected, (state, action) => {
      state.error = true;
      state.authencated = false;
    });
    builder.addCase(LoginAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.authencated = true;
      state.error = false;
    });
    builder.addCase(LoginAction.rejected, (state, action) => {
      state.error = true;
      state.authencated = false;
    });
    builder.addCase(getMeAction.fulfilled, (state, action) => {
      //  state.authencated = true;
      state.user = action.payload;
      state.loadedUser = true;
    });
  },
});
export default UserSlice.reducer;
export const { register, login, logout } = UserSlice.actions;
