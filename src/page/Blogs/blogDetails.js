import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_BACKEND } from "../../constants";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "./style.css";
import parse from "html-react-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";


export const BlogDetails = () => {
  const { id } = useParams();
  // const [article, setArticle] = useState({});
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(URL_BACKEND + `/api/blogs/${id}?populate=*`).then((rs) => {
      const { data } = rs;
      const article = data.data.attributes;
      setImg(article.Media.data.attributes.url);
      //console.log(article)
      setTitle(article.title);
      setTime(article.publishedAt);
      setDescription(article.description);
      // //console.log(article.Content);

      article.Content = article.Content.replaceAll(
        `/uploads/`,
        `${URL_BACKEND}/uploads/`
      );
      setContent(article.Content);
    });
    axios.get(URL_BACKEND + `/api/blogs?populate=*`).then(rs => {
      const { data } = rs;
      setBlogs(data.data);
      // console.log(data.data)
    });
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div className="row block">

          <div className="row">
            <div className="col">
              <img style={{ width: "100%", height:'500px', objectFit:'cover' }} src={img} alt="" />
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 mb-3 mt-3">
              <h2 className="second">{title}</h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12">
              <h2 className="" style={{ fontSize: 18, fontWeight: 'bold',color:'gray' }}>{parse(description)}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <h3 className="description mt-2">
                {moment(time).format("DD/MM/YYYY HH:mm")}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col" id="content">
              {parse(content)}
            </div>
          </div>
          <div className="row">
            <h3 style={{ fontSize: 20, fontWeight: 'bold', marginTop : '20px' }}>Bài viết khác</h3>
            <Carousel responsive={responsive}>
              {
                blogs.map((e, index) => {
                  return (
                    <div key={index} className="p-2">

                      <div className="row">
                        <div className="col fit-content">
                          <img
                            style={{
                              width: "100%",
                              height: 200,
                            }}
                            src={
                               e.attributes.Media.data.attributes.url
                            }
                            alt={
                              e.attributes.Media.data.attributes.alternativeText
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="">
                          {/* <p className="description mt-3 mb-0">
                            {moment(e.attributes.publishedAt).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </p> */}
                          <h3
                            className="title-article mt-2 "
                            style={{ fontSize: 16 }}
                          >
                            <Link
                              to={`/blogs/${e.id}`}
                              style={{ textDecoration: "none", color: 'black' }}
                            >{e.attributes.title}  </Link>
                          </h3>

                          {/* <p className="description">
                            {e.attributes.description}

                          </p> */}
                        </div>
                      </div>

                    </div>
                  );
                })
              }
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};