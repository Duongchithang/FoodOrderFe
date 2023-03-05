import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_BACKEND } from "../../constants";
import parse from "html-react-parser";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Category = () => {
  const [bigCategory, setBigCategory] = useState([]);
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/big-categories?populate=*`).then((rs) => {
      let { data } = rs;
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
            <div className="col-12 d-flex justify-content-center">
              <h3 className="hignl-title second p-3">Danh sách loại hình</h3>
            </div>
          </div>
          <div className="row">
            {bigCategory.map((e) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/mota-tiec/${e.id}`}
                  >
                    <div className="row">
                      <div className="col">
                        <LazyLoadImage
                          className="item-img"
                          src={
                            e.attributes.Media.data[0].attributes.url
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="row">
                      <h3 className="title-category center mt-2">
                        {e.attributes.name}
                      </h3>

                      <p className="description-primary center mb-1">
                        {parse(e.attributes.Description)}
                      </p>
                      <p className="description-time center">
                        Khung giờ
                        {` ${e.attributes.FromTime.substring(
                          0,
                          5
                        )} - ${e.attributes.EndTime.substring(0, 5)}`}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
