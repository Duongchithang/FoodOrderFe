import style from "./index.module.css";
import Button from "@mui/material/Button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import InfoDetail from "./InfoDetail";
import HistoryTransaction from "./HistoryTransaction";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { getMeAction } from "../../app/action/UserAction";
import { URL_BACKEND } from "../../constants";
import { Audio } from "react-loader-spinner";
import { CircularProgress, TextField } from "@mui/material";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import { logout } from "../../app/reducer/UserSlice";

function ManageUser() {
  const [ChangeBtn, SetChangeBtn] = useState(true);
  const [ItemToogle, SetItemToogle] = useState(1);
  const HandleChangeBtn = () => {
    if (ChangeBtn) {
      SetChangeBtn(false);
    } else {
      SetChangeBtn(true);
    }
  };
  const HandleToogle = (index) => {
    SetItemToogle(index);
  };
  const { users, user, loadedUser } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const refInput = useRef({});
  const [userInfo, setUserInfo] = useState({});
  const [img, setImg] = useState(
    `${URL_BACKEND}${
      user.Avatar != undefined
        ? user.Avatar.url
        : "/uploads/Avatar_Facebook_trang_bb0ad55f0d.jpeg"
    }`
  );
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    let form = new FormData();
    form.append("files", file);
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImg(reader.result);
    };

    const { data, status } = await axios.post(
      `${URL_BACKEND}/api/upload`,
      form
    );
    const dataResponse = data[0];

    if (status === 200) {
      //console.log({ Avatar: dataResponse.id });
      fetch(`${URL_BACKEND}/api/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ Avatar: dataResponse.id }),
        headers: {
          Authorization: `Bearer ${users.jwt}`,
          "Content-Type": "application/json",
        },
      }).then((rs) => {
        if (rs.status === 200) {
        } else {
          alert("Cập nhật thất bại");
        }
      });

      //    //console.log(data);
    }
  };
  const uploadFile = () => {
    ////console.log(refInput.current.target.files[0].name);
    refInput.current.click();
  };
  useEffect(() => {
    if (!loadedUser) {
      dispatch(getMeAction(users.jwt));
    }
    if (user) {
      ////console.log(user);
      setUserInfo(user);
      // console.log(user);
      setImg(
        `${URL_BACKEND}${
          user.Avatar != undefined
            ? user.Avatar.url
            : "/uploads/Avatar_Facebook_trang_bb0ad55f0d.jpeg"
        }`
      );
      // //console.log(user);
    }
  }, [loadedUser]);
  if (ItemToogle == 1) {
    if (loadedUser) {
      return (
        <div
          style={{ padding: "40px 0 40px 0", background: "#D9D9D9" }}
          className="row justify-content-center"
        >
          <div className="col-xl-3 col-11 justify-content-center text-center mt-3">
            <div className={style.ContainerCardInfo}>
              <div className={style.ContainerBlockInfo}>
                <img className={style.CardImage} src={img} alt="" />
                <div className="row mt-2">
                  <div className="col">
                    <input
                      ref={refInput}
                      onChange={handleFileUpload}
                      type="file"
                      style={{ display: "none" }}
                      // multiple={false}
                    />
                    <Button variant="containeds" onClick={uploadFile}>
                      Cập nhật ảnh đại diện
                    </Button>
                  </div>
                </div>
                <span className={style.TitleCard}>{user.FullName}</span>
              </div>
              <div>
                <ul className={style.ListMenu}>
                  <li
                    onClick={() => {
                      HandleToogle(1);
                    }}
                    className={`${style.ItemCard} ${
                      ItemToogle === 1 ? `${style.active}` : ``
                    }`}
                  >
                    Thông tin cá nhân
                  </li>
                  <li
                    onClick={() => {
                      HandleToogle(2);
                    }}
                    className={`${style.ItemCard} ${
                      ItemToogle === 2 ? `${style.active}` : ``
                    }`}
                  >
                    Lịch sử giao dịch
                  </li>
                  <li
                    onClick={() => {
                      dispatch(logout());
                      HandleToogle(3);
                    }}
                    className={`${style.ItemCard} ${
                      ItemToogle === 3 ? `${style.active}` : ``
                    }`}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-11 justify-content-center text-center mt-3">
            <div className={style.ContainerInfoAccount}>
              <div className={style.WrapperInfoAccount}>
                <h1 className={style.TitleAccount}>Thông tin tài khoản</h1>
                <div className={style.ContainerBtn}>
                  <Button
                    className="m-2"
                    onClick={() => {
                      HandleChangeBtn();
                    }}
                    variant="contained"
                    color={ChangeBtn ? "error" : "warning"}
                  >
                    CHI TIẾT
                  </Button>
                  <Button
                    onClick={() => {
                      HandleChangeBtn();
                    }}
                    variant="contained"
                    color={ChangeBtn ? "warning" : "error"}
                  >
                    ĐỔI MẬT KHẨU
                  </Button>
                </div>
              </div>
              {ChangeBtn ? <InfoDetail /> : <ChangePassword />}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <LoadingOverlay
          className="full-width"
          active={true}
          spinner
          text="Loading your content..."
        >
          <div className="full-width" style={{ height: 1000 }}></div>
        </LoadingOverlay>
      );
    }
  } else if (ItemToogle === 2) {
    return (
      <div
        style={{ padding: "40px 0 40px 0", background: "#D9D9D9" }}
        className="row justify-content-center "
      >
        <div className="col-xl-3 col-11 justify-content-center text-center mt-3">
          <div className={style.ContainerCardInfo}>
            <div className={style.ContainerBlockInfo}>
              <img className={style.CardImage} src={img} alt="" />
              <div className="row mt-2">
                <div className="col">
                  <input
                    ref={refInput}
                    onChange={handleFileUpload}
                    type="file"
                    style={{ display: "none" }}
                    // multiple={false}
                  />
                  <Button variant="containeds" onClick={uploadFile}>
                    Cập nhật ảnh đại diện
                  </Button>
                </div>
              </div>
              <span className={style.TitleCard}>{user.FullName}</span>
            </div>
            <div>
              <ul className={style.ListMenu}>
                <li
                  onClick={() => {
                    HandleToogle(1);
                  }}
                  className={`${style.ItemCard} ${
                    ItemToogle === 1 ? `${style.active}` : ``
                  }`}
                >
                  Thông tin cá nhân
                </li>
                <li
                  onClick={() => {
                    HandleToogle(2);
                  }}
                  className={`${style.ItemCard} ${
                    ItemToogle === 2 ? `${style.active}` : ``
                  }`}
                >
                  Lịch sử giao dịch
                </li>
                <li
                  onClick={() => {
                    // HandleToogle(3);
                  }}
                  className={`${style.ItemCard} ${
                    ItemToogle === 3 ? `${style.active}` : ``
                  }`}
                >
                  Đăng Xuất
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-11 justify-content-center text-center mt-3">
          <HistoryTransaction />
        </div>
      </div>
    );
  }
}

export default ManageUser;
