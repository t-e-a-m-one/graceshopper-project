// export default Home;
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllDogs from "../allDogs/AllDogs"; // Import the AllDogs component
import "./Home.css";

/**
 * COMPONENT
 */
const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div class="introdiv">
      <h3 id="welcome">Welcome!</h3>

      {isLoggedIn ? (
        <AllDogs />
      ) : (
        <p id="mustlogin">🐶 Please log in to view our dogs! 🐶</p>
      )}
      <div class="card">
        <p id="introduction">
          Get ready to wag your tails because it's always a pawsitively
          delightful paw-ty here at Fetch! Our tails are wagging with excitement
          as we strive to sniff out the perfect fur-ever match between doggos
          and their paw-some humans. But wait, there's more! You, yes you, have
          the power to lend a helping paw and make a real difference. How, you
          ask? By becoming a proud sponsor of our delightful doggos! Join our
          pack today and embark on a journey filled with unconditional love and
          endless tail-wagging adventures. So why wait? Let's unleash the joy
          and make the world a barktastic place, one sponsorship at a time. It's
          time to grab life by the leash and lend a paw! Sponsor a dog today and
          experience the boundless love and tail-wagging fun that awaits you!
        </p>
      </div>
    </div>
  );
};

export default Home;
