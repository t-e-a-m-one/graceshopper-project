import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome!</h3>
      <Link to={"/dogs"}>View Dogs</Link>
    </div>
  );
};

export default Home;
