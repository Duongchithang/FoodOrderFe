import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_BACKEND } from "../../constants";

export const RegisterAction = createAsyncThunk(
  "register/User",
  async (user) => {
    const { data, status, request } = await axios.post(
      `${URL_BACKEND}/api/auth/local/register`,
      user
    );
    localStorage.setItem("UserInfo", JSON.stringify(data));
    return data;
    // setUser(data);
  }
);
export const LoginAction = createAsyncThunk("login/User", async (user) => {
  try {
    const { data, status, request } = await axios.post(
      `${URL_BACKEND}/api/auth/local`,
      user
    );
    console.log(data)
    localStorage.setItem("UserInfo", JSON.stringify(data));
    return data;
  } catch (e) {
    throw e;
  }
});
export const getMeAction = createAsyncThunk("getMe/User", async (token) => {
  const { data } = await axios.get(
    URL_BACKEND + "/api/users/me?populate=deep,2",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
});

const initUserCurrent = () => {
  const json = localStorage.getItem("UserInfo");
  if (json) {
    return JSON.parse(json);
  } else {
    return {};
  }
};
const initUserAuthenticated = () => {
  const json = localStorage.getItem("UserInfo");
  if (json) {
    return true;
  } else {
    return false;
  }
};
export { initUserCurrent, initUserAuthenticated };
