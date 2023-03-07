import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useParams } from "react-router-dom";
import { URL_BACKEND } from "../../constants";
import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./style.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { responsive } from "../Blogs/blogDetails";

export const DetailContent = () => {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    axios
      .get(URL_BACKEND + `/api/big-categories/${id}?populate=*`)
      .then((rs) => {
        var res = rs.data;
        //  console.log(res);
        if (res.data.attributes.Avatar == null) {
          res.data.attributes.Avatar = {
            data: {
              attributes: {
                url: window.location.pathname + "img_emty.png",
              },
            },
          };
        }
       console.log(res);
        setCategory(res);
        setLoaded(true);
      });
    return () => { };
  }, []);

  return loaded == false ? (
    <LoadingOverlay
      className="full-width"
      active={true}
      spinner
      text="Loading your content..."
    >
      <div className="full-width" style={{ height: 1000 }}></div>
    </LoadingOverlay>
  ) : (
    <div className="full-width" style={{ }}>
      <div className="container">
        <div className="row block"style={{  alignItems:'start'}} >
        <div className="col-sm-12 d-flex justify-content-center">
              <h3 className="hignl-title second">Chi tiết loại tiệc</h3>
            </div>
            <div className="col-12">
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    maxHeight:500,
                    borderRadius: 10,
                  }}
                  src={
                    category.data.attributes.Media.data[0].attributes.url
                  }
                  alt=""
                />
                <div className="row d-flex justify-content-center">
                  <h3 className="title-article center">
                    {category.data.attributes.name}
                  </h3>
                  <div className="description-content mt-2">
                    {parse(category.data.attributes.Description)}
                  </div>
                  {/* <div className="title-article center  mb-2">
                    Danh sách menu
                  </div>
                  <div className="row d-flex justify-content-center mt-3">
                    <div className="col-12 col-sm-8">
                      {category.data.attributes.categories.data.map(
                        (e, index) => {
                          return (
                            <Accordion
                              expanded={expanded === `panel${index}`}
                              onChange={handleChange(`panel${index}`)}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}
                              >
                                <Typography
                                  sx={{ width: "33%", flexShrink: 0 }}
                                >
                                  {e.attributes.name}
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {parseInt(e.attributes.price).toLocaleString(
                                    "it-IT",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  {e.attributes.products.data.map(
                                    (product, index) => {
                                      return (
                                        <p className="description">{`${
                                          index + 1
                                        }. ${product.attributes.name}`}</p>
                                      );
                                    }
                                  )}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        }
                      )}
                    </div>
                  </div> */}
                  <div className="row d-flex justify-content-end">
                    <div className="description d-flex justify-content-end mt-4">
                      Khung thời gian:
                      {` ${category.data.attributes.FromTime.substring(
                        0,
                        5
                      )} - ${category.data.attributes.EndTime.substring(0, 5)}`}
                    </div>
                  </div>
                  <div className="description-content mt-2">
                    {parse(category.data.attributes.content)}
                  </div>
                  <div className="title-article center mb-2">Media</div>
                  <div className="row p-3" >
                    <Carousel responsive={responsive} >
                      {category.data.attributes.Media.data.map((e, index) => (
                       
                        <div className="row m-2">
                        <div className="col fit-content">
                          <img
                            style={{
                              width: "100%",
                              height: 200,
                            }}
                            src={
                              e.attributes.url
                            }
                            alt={
                              e.attributes.url
                            }
                          />
                        </div>
                      </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
        
        </div>
      </div>
    </div>
  );
};
