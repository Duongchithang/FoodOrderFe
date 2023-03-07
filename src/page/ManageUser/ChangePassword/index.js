import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { URL_BACKEND } from "../../../constants";
import style from "./index.module.css";
function ChangePassword() {
  const { users } = useSelector((state) => state.userReducer);
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const handleChangePassword = async () => {
    const dataSend = {
      password: currentPassword,
      currentPassword: password,
      passwordConfirmation: currentPassword,
    };
    // //console.log(users.jwt);

    try {
      const { data, status, statusText } = await axios(
        `${URL_BACKEND}/api/auth/change-password`,
        {
          headers: {
            Authorization: "Bearer " + users.jwt,
            "Content-Type": "application/json",
          },
          data: JSON.stringify(dataSend),
          method: "POST",
        }
      );
      if (status === 200) {
        alert("Đổi mật khẩu thành công");
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        alert("Mật khẩu hiện tại không đúng");
      }
    } catch (error) {
      alert("Mật khẩu hiện tại không đúng");
    }
  };
  return (
    <div>
      <form className="col-12 col-sm-12 col-md-6 p-3">
        <div className="d-flex flex-column">
          <TextField
            placeholder="Mật khẩu hiện tại"
            label="Mật khẩu hiện tại"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <TextField
            placeholder="Mật khẩu mới"
            type="password"
            label="Mật khẩu mới"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <Button
          className="mt-4 d-flex"
          variant="contained"
          onClick={handleChangePassword}
        >
          CẬP NHẬT
        </Button>
      </form>
    </div>
  );
}
export default ChangePassword;
