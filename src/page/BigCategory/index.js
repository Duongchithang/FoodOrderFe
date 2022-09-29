import React, { useState, useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import axios from "axios";
import { URL_BACKEND } from "../../constants";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { categoryMock } from "../../mock/CategoryMock";
export const BigCategory = () => {
  const [bigCategory, setBigCategory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState(categoryMock);
  const [selected, setSelected] = useState(false);
  const [itemSelected, setItemSelected] = useState(categoryMock);
  const [listMenu, setListMenu] = useState([]);
  const handleOpen = (idItem) => {
    setItem(bigCategory.find((e) => e.id == idItem));
    setListMenu(bigCategory.filter((e) => e.id != idItem));
    setOpen(true);
  };
  const handleSelected = (idItem) => {
    const categorySelected = bigCategory.find((e) => e.id == idItem);
    if (categorySelected) {
      setItemSelected(bigCategory.find((e) => e.id == idItem));
      setSelected(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/categories?populate=deep,3`).then((rs) => {
      let { data } = rs;
      // console.log(rs);
      console.log(data.data);
      setBigCategory(data.data);
    });

    return () => {};
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 d-flex justify-content-center">
              <h3 className="hignl-title second">Các loại hình tiệc</h3>
            </div>
          </div>
          <div className="row">
            {bigCategory.map((e, index) => {
              return (
                <div key={index} className="col-sm-12">
                  <div>
                    <div className="row">
                      <div className="col-sm-12 col-md-6 col-lg-6">
                        <div className="row mt-2 mb-2">
                          {new Array(4).fill().map((product, index) => {
                            //  console.log(product);
                            let urlImg = "";
                            //    console.log(e.attributes.products.data.length);
                            if (e.attributes.products.data.length < index + 1) {
                              urlImg = "/img_emty.png";
                            } else {
                              // console.log(e.attributes);
                              // console.log(
                              //   e.attributes.products.data[index].attributes
                              //     .avatar.data.attributes.url
                              // );
                              urlImg =
                                URL_BACKEND +
                                e.attributes.products.data[index].attributes
                                  .avatar.data.attributes.url;
                            }
                            return (
                              <div
                                key={index}
                                className=" col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                              >
                                <img
                                  src={urlImg}
                                  className="item-img"
                                  width={"100%"}
                                  alt=""
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-6 ">
                        <div
                          className="row flex-column justify-content-center"
                          style={{ height: "100%", width: "100%" }}
                        >
                          <div className="row d-flex justify-content-between">
                            <div className="col-6">
                              <h5 style={{ fontWeight: 700 }}>
                                {e.attributes.name}
                              </h5>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                  handleOpen(e.id);
                                }}
                              >
                                So sánh
                              </Button>
                            </div>
                          </div>
                          {/* {parseInt(e.attributes.price).toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )} */}
                          <div
                            className="row m-2 flex-column justify-content-between"
                            style={{ height: 250 }}
                          >
                            <div className="col-sm-12 col-md-12">
                              {e.attributes.products.data.map(
                                (product, index) => {
                                  return (
                                    <p className="description">{`${
                                      index + 1
                                    }. ${product.attributes.name}`}</p>
                                  );
                                }
                              )}
                            </div>
                            <div className="col-sm-12">
                              <div className="row d-flex justify-content-around">
                                <div className="col">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                  >
                                    Cần hỗ trợ thêm
                                  </Button>
                                </div>
                                <div className="col">
                                  <Button
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                  >
                                    Đặt tiệc
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "80%", flexDirection: "column" }}>
          <FormControl style={{ height: 60 }} fullWidth>
            <InputLabel id="demo-simple-select-label">
              Chọn loại muốn so sánh
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={itemSelected.id}
              label="Chọn loại muốn so sánh"
              onChange={(e) => {
                //console.log(e);
                handleSelected(e.target.value);
              }}
            >
              {listMenu.map((e, index) => {
                return (
                  <MenuItem key={index} value={e.id}>
                    {e.attributes.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-sm-5 " style={{ marginRight: 20 }}>
              <div className="col-sm-12">
                <div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="row mt-2 mb-2">
                        {new Array(4).fill().map((product, index) => {
                          //  console.log(product);
                          let urlImg = "";
                          if (
                            item.attributes.products.data.length <
                            index + 1
                          ) {
                            urlImg = "/img_emty.png";
                          } else {
                            urlImg =
                              URL_BACKEND +
                              item.attributes.products.data[index].attributes
                                .avatar.data.attributes.url;
                          }
                          return (
                            <div
                              key={index}
                              className=" col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                            >
                              {/* itemSelected.attributes.products.data */}
                              <img
                                src={urlImg}
                                className="item-img"
                                width={"100%"}
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div
                        className="row flex-column justify-content-center"
                        style={{ height: "100%", width: "100%" }}
                      >
                        <div className="row d-flex justify-content-between">
                          <div className="col-12">
                            <h5 style={{ fontWeight: 700 }}>
                              {item.attributes.name}
                            </h5>
                          </div>
                        </div>
                        {/* {parseInt(e.attributes.price).toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )} */}
                        <div
                          className="row m-2 flex-column justify-content-between"
                          style={{ height: 250 }}
                        >
                          <div className="col-sm-12 col-md-12">
                            {item.attributes.products.data.map(
                              (product, index) => {
                                return (
                                  <p className="description">{`${index + 1}. ${
                                    product.attributes.name
                                  }`}</p>
                                );
                              }
                            )}
                          </div>
                          <div className="col-sm-12">
                            <div className="row d-flex justify-content-around">
                              <div className="col">
                                <Button
                                  variant="contained"
                                  color="warning"
                                  fullWidth
                                >
                                  Cần hỗ trợ thêm
                                </Button>
                              </div>
                              <div className="col">
                                <Button
                                  fullWidth
                                  color="error"
                                  variant="contained"
                                >
                                  Đặt tiệc
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              {selected == true ? (
                <div className="col-sm-12">
                  <div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row mt-2 mb-2">
                          {new Array(4).fill().map((product, index) => {
                            //  console.log(product);
                            let urlImg = "";
                            if (
                              itemSelected.attributes.products.data.length <
                              index + 1
                            ) {
                              urlImg = "/img_emty.png";
                            } else {
                              urlImg =
                                URL_BACKEND +
                                itemSelected.attributes.products.data[index]
                                  .attributes.avatar.data.attributes.url;
                            }
                            return (
                              <div
                                key={index}
                                className=" col-6 col-sm-6 p-1 ml-0 mr-1 d-flex justify-content-center"
                              >
                                {/* itemSelected.attributes.products.data */}
                                <img
                                  src={urlImg}
                                  className="item-img"
                                  width={"100%"}
                                  alt=""
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div
                          className="row flex-column justify-content-center"
                          style={{ height: "100%", width: "100%" }}
                        >
                          <div className="row d-flex justify-content-between">
                            <div className="col-12">
                              <h5 style={{ fontWeight: 700 }}>
                                {itemSelected.attributes.name}
                              </h5>
                            </div>
                          </div>
                          {/* {parseInt(e.attributes.price).toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )} */}
                          <div
                            className="row m-2 flex-column justify-content-between"
                            style={{ height: 250 }}
                          >
                            <div className="col-sm-12 col-md-12">
                              {itemSelected.attributes.products.data.map(
                                (product, index) => {
                                  return (
                                    <p className="description">{`${
                                      index + 1
                                    }. ${product.attributes.name}`}</p>
                                  );
                                }
                              )}
                            </div>
                            <div className="col-sm-12">
                              <div className="row d-flex justify-content-around">
                                <div className="col">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                  >
                                    Cần hỗ trợ thêm
                                  </Button>
                                </div>
                                <div className="col">
                                  <Button
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                  >
                                    Đặt tiệc
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Button variant="contained" onClick={handleClose}>
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  display: "flex",
  overflow: "scroll",
  justifyContent: "center",
  alignItems: "center",
  pt: 30,
  // pb: 20,
  px: 4,
};
