import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Footer } from "./layout/footer";
import Header from "./layout/header";
import { Login } from "./page/Login";
import { Home } from "./page/home";
import { RecoveryPassword } from "./page/RecoverPassword";
import { NotFound } from "./page/NotFound";
import { BigCategory } from "./page/BigCategory";
import { Blogs } from "./page/Blogs";
import { Category } from "./page/category";
import { DetailCategory } from "./page/category/details";
import { BlogDetails } from "./page/Blogs/blogDetails";
import { Register } from "./page/Register";
import GoogleAuthCallback from "./page/GoogleCallBack";
import FacebookCallBack from "./page/FacebookCallBack";
import { useDispatch, useSelector } from "react-redux";
// import { decode } from "jwt-check-expiry";
import { login, logout } from "./app/reducer/UserSlice";
import { UserInfo } from "./page/User";
import ManageUser from "./page/ManageUser";
import { Cart } from "./page/Cart";
import { Contact } from "./page/Contact";
import { ToastContainer } from "react-toastify";
import { DetailContent } from "./page/category/DetailContent";
import { FilterCategory } from "./page/category/FilterCategory";

export const RouteApp = () => {
  let dispatch = useDispatch();
  const { users, authencated } = useSelector((state) => state.userReducer);
  // useEffect(() => {
  //   if (authencated === true) {
  //     const tokenDecode = decode(users.jwt);
  //     //  //console.log(tokenDecode);
  //     if (tokenDecode.header.iat < tokenDecode.header.exp) {
  //       const json = localStorage.setItem("UserInfo", JSON.stringify(users));
  //     }
  //   } else {
  //     const json = localStorage.getItem("UserInfo");

  //     if (json.length > 0) {
  //       const userInfo = JSON.parse(json);
  //       const tokenDecode = decode(userInfo.jwt);
  //       //console.log(tokenDecode.payload.iat);
  //       //console.log(tokenDecode.payload.exp);
  //       if (tokenDecode.payload.iat < tokenDecode.payload.exp) {
  //         dispatch(login(userInfo));
  //       }
  //     } else {
  //       dispatch(logout());
  //     }
  //   }
  // }, [authencated]);
  const divRef = useRef();

  const handleScroll = () => {
   
    divRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  return (
    <Router>
      <Header handleScroll={handleScroll} />
      <Routes>
        <Route exact path="/" element={<Home divRef={divRef} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dat-tiec" element={<Home divRef={divRef} />}/>
        <Route exact path="/cac-loai-tiec" element={<Category />} />
        <Route exact path="/cac-loai-tiec/:id" element={<DetailCategory />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/blogs/:id" element={<BlogDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route exact path="/recovery-password" element={<RecoveryPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/callback/google" element={<GoogleAuthCallback />} />
        <Route path="/auth/callback/facebook" element={<FacebookCallBack />} />
        <Route path="/mota-tiec/:id" element={<DetailContent />} />
        <Route path="/filter-tiec" element={<FilterCategory />} />
        <Route path="/forgot-password" element={<RecoveryPassword />} />
        <Route
          exact
          path="/user/info"
          element={<PrivateRoute element={<ManageUser />} auth={authencated} />}
        />
      </Routes>
       <Footer/>
      <ToastContainer />
    </Router>
  );
};
const PrivateRoute = ({ element, auth }) => {
  //console.log(auth);
  if (!auth) {
    // navigate("/login");
    return <Navigate to="/login" replace={true} />;
  } else {
    return element;
  }
};
