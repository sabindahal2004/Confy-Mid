import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth, setAuth, refresh, setRefresh } = useContext(AuthContext);
  const navigator = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/auth", {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAuth(data);
          setRefresh(false);
        }else{
          setAuth(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [auth, refresh]);

  const logOut = () => {
    localStorage.removeItem("token");
    setRefresh(true);
    navigator("/login");
  };

  return (
    <header>
        <Link to={'/'}>
        <h2>
          Confiy<span>.</span>
        </h2>
        </Link>
      <nav>
        {auth ? (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Create Post</Link>
            <h4
              className="nav-link"
              style={{
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
                border:"2px solid #56D8E4",
                padding:"6px 15px",
                borderRadius:"50px"
              }}
              onClick={logOut}
            >
              Logout
            </h4>
          </>
        ) : (
          <>
            <Link to={"/register"} className="nav-link" >
              Register
            </Link>
            <Link to={"/login"} className="nav-link" style={{
                color: "#fff",
                textDecoration: "none",
                cursor: "pointer",
                border:"2px solid #56D8E4",
                padding:"6px 15px",
                borderRadius:"50px"
              }}>
              Login
            </Link>
          </>
        )}
      </nav>
      <button id="basic-button" onClick={toggleMenu}>
        &#9776;
      </button>
      <div id="basic-menu" style={{ display: menuOpen ? "block" : "none" }}>
        {auth ? (
          <>
            <Link to={"/"} onClick={closeMenu}>
              Home
            </Link>
            <Link to={"/create"} onClick={closeMenu}>
              Create Post
            </Link>
            <h4
              className="nav-link"
              style={{
                color: "#000",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: "300",
                marginLeft: "9.9px",
              }}
              onClick={() => {
                closeMenu();
                logOut();
              }}
            >
              Logout
            </h4>
          </>
        ) : (
          <>
            <Link to={"/register"} className="nav-link" onClick={closeMenu}>
              Register
            </Link>
            <Link to={"/login"} className="nav-link" onClick={closeMenu}>
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
