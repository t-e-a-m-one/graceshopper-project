import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";

/**
 * The AuthForm component can be used for Login or Sign Up.
 * Props for Login: name="login", displayName="Login"
 * Props for Sign up: name="signup", displayName="Sign Up"
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      <form
        style={{ textAlign: "center" }}
        onSubmit={handleUserSubmit}
        name={name}
      >
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
      <div style={{ textAlign: "center" }}>
        <small>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </small>
      </div>
    </div>
  );
};

export default AuthForm;
