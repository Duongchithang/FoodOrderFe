import style from "./index.module.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { memo, useState } from "react";
import axios from "axios";
import { URL_BACKEND } from "../../../constants";
import moment from "moment";
import React from "react";
function InfoDetail() {
  const { users, user } = useSelector((state) => state.userReducer);
  //   const user = users.user;
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user.FullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.PhoneNumber);
  const [address, setAddress] = useState(user.Address);
  const [birthDate, setBirthDate] = useState(user.BirthDate);
  const [company, setCompany] = useState(user.Company);
  const [companyRole, setCompanyRole] = useState(user.CompanyRole);
  const [employeeCount, setEmployeeCount] = useState(user.EmployeeCount);
  // //console.log(user);
  const handleUpdate = async () => {
    const userInfo = {
      ...users,
      Address: address,
      PhoneNumber: phone,
      FullName: fullName,
      email: email,
      Company: company,
      BirthDate: birthDate,
      CompanyRole: companyRole,
      EmployeeCount: employeeCount,
    };
    const { data, status } = await axios(
      `${URL_BACKEND}/api/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + users.jwt,
        },
        data: JSON.stringify(userInfo),
      }
    );
    if (status === 200) {
      alert("Cập nhật thông tin người dùng thành công");
      window.location.reload();
    } else {
      alert(" Cập nhật thất bại vui lòng thử lại sau");
    }
  };
  return (
    <div>
      <form className="row d-flex  p-3">
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="email"
            label="Email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="text"
            label="Họ và tên"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="text"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={phone != null ? phone : ""}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            id="date"
            label="Sinh nhật"
            type="date"
            value={moment(birthDate).format("yyyy-MM-DD")}
            defaultValue={moment(Date()).format("yyyy-MM-DD")}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="text"
            label="Địa chỉ"
            placeholder="Địa chỉ"
            value={address != null ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="text"
            label="Tên công ty"
            placeholder="Tên Công ty"
            value={company != null ? company : ""}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="text"
            label="Chức vụ"
            placeholder="Chức vụ"
            value={companyRole != null ? companyRole : ""}
            onChange={(e) => setCompanyRole(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-md-6 mt-3">
          <TextField
            fullWidth
            type="number"
            label="Quy mô nhân sự"
            placeholder="Quy mô nhân sự"
            value={employeeCount != null ? employeeCount : ""}
            onChange={(e) => setEmployeeCount(e.target.value)}
          />
        </div>
        <Button
          className="mt-4 d-flex"
          variant="contained"
          onClick={handleUpdate}
        >
          CẬP NHẬT
        </Button>
      </form>
    </div>
  );
}
export default InfoDetail;
