import { Button, TextField, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { initInfoCompany } from "../app/action/CompanyAction";
import { URL_BACKEND } from "../constants";
import "./style.css";

export const Footer = () => {
  const [emailSubmit, setEmailSubmit] = useState("");
  const [blogs, setBlogs] = useState([]);

  const { data, loaded } = useSelector(state => state.companyStored);
  const onSubmitEmailSend = () => {
    if (emailSubmit == null) {
      toast("Email không đúng định dạng");
    } else {
      let dataSend = {
        data: {
          email: emailSubmit,
        },
      };
      axios.post(URL_BACKEND + "/api/emaill-submits", dataSend).then((rs) => {
        if (rs.status != 200) {
          //  alert("Gửi thông tin thất bại");
          toast("Email không đúng định dạng");
        } else {
          toast("Gửi thông tin thành công");
        }
      });
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initInfoCompany());
    axios.get(URL_BACKEND + "/api/blogs?populate=*&filters[display][$eq]=1").then(rs => {
      const { data } = rs;
      setBlogs(data.data);
    })

  }, []);
  if (loaded == true) {
    return (
      <>
        <div className="container-fluid">
          <div className="row block mr-0 mb-0">
            <div className="row d-flex justify-content-between mb-2">
              <div className="col-sm-6">
                <h5>Đăng ký nhận thêm thông tin Các ưu đãi riêng biệt</h5>
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                <div className="col-sm-6">
                  <TextField
                    fullWidth
                    onChange={(e) => setEmailSubmit(e.target.value)}
                    placeholder="Nhập email của bạn"
                    style={{ marginRight: 20 }}
                  />
                </div>
                <div className="col-sm-2 d-flex jusitfy-content-end">
                  <Button
                    className="ml-5"
                    color="error"
                    variant="contained"
                    onClick={onSubmitEmailSend}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
            <div className="row mt-2 footer">
              <div className="col-sm-3 ">
                <img src="logo_color.png" />
                <div className="row mt-2 mb-2">
                  <div className="col">{data[0].attributes.Slogan}</div>
                </div>
                <Divider light />
                <div className="row mt-2">
                  <h4>{data[0].attributes.name}</h4>
                  <p className="m-0">
                    Địa chỉ: {data[0].attributes.address}
                  </p>
                  <p className="m-0">
                    Email: {data[0].attributes.email}{" "}
                  </p>
                  <p className="m-0">Sđt: {data[0].attributes.phone}</p>
                </div>
              </div>{
                blogs.map((e, index) => {
                  return <div className="col-6 col-sm-3">
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/blogs/${e.id}`} ><h6>{e.attributes.title}</h6></Link>

                  </div>
                })
              }

            </div>
            <div className="row"></div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
