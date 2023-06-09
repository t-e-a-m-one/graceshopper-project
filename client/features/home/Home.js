//Libraries
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Files
import { fetchCartAsync } from "../cart/cartSlice";

/**
 * Home component.
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);
  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync(user));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Welcome, {username}</h3>
      <div style={{ textAlign: "center" }}>
        <button>
          <Link to="/allProducts">View all products</Link>
        </button>
        <button>
          <Link to="/cart">View my cart</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
