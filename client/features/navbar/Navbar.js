import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const myId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/home");
  };

  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <>
            <div className="header">
              <h3 className="user" id="title1">
                Hello, {username}!
              </h3>
            </div>
            <div className="nav-bar">
              <div className="statement">
                <h1 id="pethome">Where every pet can find a home.</h1>
              </div>
              <div className="nav-bar-right">
                <Link to="/home">Home</Link>
                <Link to={`/signup`}>Sign Up</Link>
                <Link to={`/cart`}>Cart</Link>
                <button
                  className="logout"
                  type="button"
                  onClick={logoutAndRedirectHome}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="header"></div>

            <div className="nav-bar">
              <div className="statement">
                <h1 id="pethome">Where every pet can find a home.</h1>
              </div>
              <div className="nav-bar-right">
                <Link to="/home">Home</Link>
                <Link to={`/users/cartitems`}>Cart</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
