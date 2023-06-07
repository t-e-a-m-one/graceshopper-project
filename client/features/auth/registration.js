import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../app/store";

const Registration = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    dispatch(register({ username, password }))
      .then(() => {
        // Handle successful registration, such as redirecting to another page
      })
      .catch((error) => {
        // Handle registration error
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Registration</h2>
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
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Registration;
