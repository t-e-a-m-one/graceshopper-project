import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
// import "./Navbar.css";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div>
      <h1>Fetch</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="header">
              <img
                className="header__logo"
                src="https://picsum.photos/200/40"
                alt="Fetch Logo"
              />
              <div className="header__search">
                <input className="header__searchInput" type="text" />
              </div>
              <div className="header__nav">
                <div className="header__option">
                  <span className="header__optionLineOne">Log In</span>
                </div>
                <div className="header__option">
                  <span className="header__optionLineOne">Register </span>
                </div>
                <div className="header__optionBasket">
                  <span className="header__optionLineTwo header__basketCount"></span>
                </div>
                <div className="header__favorites"></div>
              </div>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};
export default Navbar;
