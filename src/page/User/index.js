import style from "./index.module.css";
import Button from "@mui/material/Button";
import React from "react";
export const UserInfo = () => {
  return (
    <div>
      <form className={style.FormInfoAccount}>
        <div className="d-flex flex-column">
          <span>Email</span>
          <input
            className="border py-[12px] px-[10px] rounded-[10px]"
            id="email"
            type="email"
            placeholder="Input email"
          />
        </div>
        <div className="d-flex flex-column mt-4">
          <span>Họ tên</span>
          <input
            className="border py-[12px] px-[10px] rounded-[10px]"
            id="name"
            type="text"
            placeholder="Input Name"
          />
        </div>
        <div className="d-flex flex-column mt-4">
          <span>Số điện thoại</span>
          <input
            className="border py-[12px] px-[10px] rounded-[10px]"
            id="number"
            type="text"
            placeholder="Input Phone Number"
          />
        </div>
        <Button className="mt-4 d-flex" variant="contained">
          CẬP NHẬT
        </Button>
      </form>
    </div>
  );
};
