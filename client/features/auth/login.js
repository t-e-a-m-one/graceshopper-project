import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../app/store";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }))
      .then(() => {
        // Handle successful login, such as redirecting to another page
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
