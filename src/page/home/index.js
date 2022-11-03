import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Header from "../../layout/header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  TextField,
  Slider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import parse from "html-react-parser";
import "./style.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { vi } from "date-fns/locale";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import moment from "moment";
import { Footer } from "../../layout/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { CarouselMock } from "../../mock/CaroulMock";

export const Home = ({ divRef }) => {
  const navigate = useNavigate();
  //state render Web app
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [listType, setListType] = useState([]);
  const [blog, setBlog] = useState([]);
  const [range, setRange] = React.useState(0);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [info, setInfo] = useState({});
  const [time, setTime] = useState("06:00");
  //state for form submit
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [amountCus, setAmountCus] = useState("");


  const location = useLocation();
  React.useEffect(()=>{
   // console.log(location.pathname)
      if(location.pathname=="/dat-tiec"){
        divRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
  },[location.pathname]);

  //const notify = () => toast("Wow so easy!");
  const handleChangeRange = (event, newValue) => {
    setRange(newValue);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    const data = {
      data: {
        Email: email,
        fullname: fullName,
        content: content,
        address: address,
        phone: phone,
        title: title,
      },
    };
    axios
      .post(URL_BACKEND + "/api/feedbacks", data)
      .then((rs) => {
        if (rs.status != 200) {
          //  alert("Gửi thông tin thất bại");
          toast("Gửi thông tin thất bại");
        } else {
          toast("Gửi thông tin thành công");
        }
      })
      .catch((err) =>
        toast("Gửi thông tin thất bại vui lòng kiểm tra lại các ô yêu cầu ")
      );
  };

  const [background, setBackground] = useState(CarouselMock);
  useEffect(() => {
    let url = URL_BACKEND + `/api/banners?populate=*`;
    axios.get(url).then((rs) => {
      let { data } = rs;
      //  //console.log(data.data);
      setBackground(data.data);
    });
    //let url = URL_BACKEND + `/api/banners?populate=*`;
    axios
      .get(
        URL_BACKEND +
          `/api/big-categories?populate=*&sort[0]=Index:desc&sort[1]=publishedAt:desc`
      )
      .then((rs) => {
        let { data } = rs;
        // //console.log(data.data);
        setListType(data.data);
      });
    axios
      .get(
        URL_BACKEND +
          `/api/blogs?populate=*&sort=index:desc&sort[1]=publishedAt:desc`
      )
      .then((rs) => {
        let { data } = rs;
        data.data = data.data.filter((e, index) => index <= 2);
        setBlog(data.data);
      });

    return () => {};
  }, []);

  return (
    <>
      <div className="full-width">
        <div className="slide">
          <Carousel autoPlay interval={2000}>
            {background.map((e, index) => (
              <div
                className="slide_bg"
                key={index}
                style={{
                  backgroundImage: `URL(
                    "${URL_BACKEND + e.attributes.Media.data.attributes.url}"
                  )`,
                }}
              >
                <p className="legend">{e.attributes.Title}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="container">
            <div className="row block">
              <div className="row d-flex justify-content-center">
                <div className="col-sm-12 d-flex justify-content-center">
                  <h3 className="hignl-title" ref={divRef}>
                    Đặt tiệc
                  </h3>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setAmountCus(e.target.value);
                    }}
                    value={amountCus}
                    type="number"
                    label="Số lượng khách *"
                    placeholder="Số lượng khách"
                    variant="outlined"
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Giờ bắt đầu tiệc*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={time}
                      label="Giờ bắt đầu tiệc"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    >
                      {new Array(18).fill().map((e, index) => {
                        if (index + 6 < 10) {
                          return (
                            <MenuItem value={`0${index + 6}:00`}>{`${
                              index + 6
                            }:00`}</MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem value={`${index + 6}:00`}>{`${
                              index + 6
                            }:00`}</MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                  <DesktopDatePicker
                    label="Ngày diễn ra tiệc: *"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 ">
                  <span>Đơn giá /khách: *</span>
                  <Slider
                    fullWidth
                    aria-label="Volume"
                    value={range}
                    color="secondary"
                    min={0}
                    onChange={handleChangeRange}
                  />
                  <span>
                    {(range * 20000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className=".col-sm-12 d-flex justify-content-center">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/filter-tiec?from=${100000}&to=${
                          range * 20000
                        }&amount=${amountCus}&time=${time}`
                      );
                    }}
                  >
                    Xác nhận
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </LocalizationProvider>
        <div className="container">
          <div className="row block">
            <div className="row d-flex justify-content-center">
              <div className=".col-sm-12 d-flex justify-content-center">
                <h3 className="hignl-title second">Các loại tiệc</h3>
              </div>
            </div>
            {listType.map((e, index) => {
              if (index < 3) {
                return (
                  <Link
                    key={index}
                    style={{ textDecoration: "none" }}
                    to={`mota-tiec/${e.id}`}
                    className={
                      index % 2 === 0
                        ? "row d-flex m-2"
                        : "row d-flex flex-row-reverse m-2"
                    }
                  >
                    <div className="col-sm-12 col-md-6 col-lg-3 fit-content">
                      <img
                        src={
                          URL_BACKEND + e.attributes.Avatar.data.attributes.url
                        }
                        alt=""
                      />
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <h3 className="title-article">{e.attributes.name}</h3>
                      <p
                        className="
                      description-primary"
                      >
                        {parse(e.attributes.Description)}
                      </p>
                    </div>
                  </Link>
                );
              } else {
                return null;
              }
            })}
            <div className="row d-flex justify-content-center mt-4">
              <div className=".col-sm-12 d-flex justify-content-center">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    navigate("/cac-loai-tiec");
                  }}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row block">
            <div className="row d-flex justify-content-center">
              <div className=".col-sm-12 d-flex justify-content-center">
                <h3 className="hignl-title second">Blogs</h3>
              </div>
            </div>
            <div className="row">
              {blog.map((e, index) => {
                if (index === 0) {
                  var img =
                    e.attributes.Media.data != null
                      ? URL_BACKEND + e.attributes.Media.data.attributes.url
                      : "img_emty.png";
                  return (
                    <div key={index} className="col-sm-12 col-md-12 col-lg-8">
                      <Link
                        to={`/blogs/${e.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="row d-flex justify-content-center">
                          <div className="row d-flex flex-column">
                            <div className="fit-content">
                              <img src={img} />
                            </div>
                            <div className="">
                              <h3 className="title-article">
                                {e.attributes.title}
                              </h3>
                              <p className="description">
                                {moment(e.attributes.publishedAt).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>
                              <p className="description">
                                {e.attributes.description.substring(0, 1000)}
                                ...
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              <div className="col-sm-12 col-md-12 col-lg-4">
                {blog.map((e, index) => {
                  if (index === 0) {
                    return null;
                  } else {
                    //console.log(e.attributes.Media.data);

                    var img =
                      e.attributes.Media.data != null
                        ? URL_BACKEND + e.attributes.Media.data.attributes.url
                        : "img_emty.png";
                    return (
                      <Link key={index}
                        to={`/blogs/${e.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="row d-flex justify-content-center">
                          <div className="row d-flex flex-column">
                            <div className="fit-cover">
                              <img
                                style={{ maxHeight: 200, objectFit: "cover" }}
                                src={img}
                              />
                            </div>
                            <div className="">
                              <h5 className="title-article">
                                {e.attributes.title}
                                ...
                              </h5>
                              <p className="description">
                                {" "}
                                {moment(e.attributes.publishedAt).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>
                              <p className="description">
                                {e.attributes.description.substring(0, 180)}
                                ...
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <div className=".col-sm-12 d-flex justify-content-center">
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    navigate("/blogs");
                  }}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row block">
            <div className="row">
              <div className="col-sm-12 col-md-6 name_text">
                <TextField
                  fullWidth
                  placeholder="Họ tên"
                  label="Họ tên *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="col-sm-12 col-md-6 ">
                <TextField
                  fullWidth
                  placeholder="Tiêu đề"
                  label="Tiêu đề *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="row">
                  <div className="col-sm-12 mt-4">
                    <TextField
                      fullWidth
                      label="Số điện thoại: *"
                      placeholder="Số điện thoại: *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 mt-4">
                    <TextField
                      fullWidth
                      label="Email: *"
                      placeholder="Email: *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 mt-4">
                    <TextField
                      fullWidth
                      label="Địa chỉ:"
                      placeholder="Địa chỉ:"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="col-sm-12 mt-4">
                  <TextField
                    label="Nội dung*"
                    fullWidth
                    placeholder="Nội dung"
                    multiline
                    rows={8}
                    maxRows={20}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <div className=".col-sm-12 d-flex justify-content-center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                >
                  Gửi thông tin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
