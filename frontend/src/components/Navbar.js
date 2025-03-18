import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import noteContext from "../context/Notecontext";
import Profile from "./Profile";
import Addnote from "./Addnote";

function Navbar() {
  const { getUser, userinfo } = useContext(noteContext);
  const [click, setClick] = useState(false);
  const [post, setPost] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Only call getUser when the component mounts
    if (!userinfo) {
      getUser();
    }
  }, [getUser, userinfo]);

  const handleModalClose = () => {
    setClick(false);
    setPost(false); // Close both modals
  };

  const getUserinfo = () => setClick(true); // Open the Profile modal
  const addPost = () => setPost(true); // Open the Addnote modal

  // Safely get the first character of the name, defaulting to "A"
  // console.log(getUserinfo.user.name);
  const firstChar = userinfo?.user?.name?.charAt(0) || "A"; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Blog App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "Active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "Active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("auth-token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <>
              <button onClick={addPost} className="btn btn-primary mx-1">
                <i className="fa-solid fa-plus"></i> Add Blog
              </button>
              <button className="personal mx-1" onClick={getUserinfo}>
                {firstChar}
              </button>
            </>
          )}
          <Profile click={click} handleModalClose={handleModalClose} />
          <Addnote post={post} handleModalClose={handleModalClose} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
