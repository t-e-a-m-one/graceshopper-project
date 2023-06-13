// // export default Homeimport React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import AllDogs from "../allDogs/AllDogs"; // Import the AllDogs component

// /**
//  * COMPONENT
//  */
// const Home = (props) => {
//   const isLoggedIn = useSelector((state) => !!state.auth.me.id);

//   return (
//     <div>
//       <h3>Welcome!</h3>

//       {isLoggedIn && <AllDogs />}
//       {!isLoggedIn && <p>Please log in to view the dogs.</p>}
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllDogs from "../allDogs/AllDogs"; // Import the AllDogs component

/**
 * COMPONENT
 */
const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div>
      <h3>Welcome!</h3>

      {isLoggedIn ? <AllDogs /> : <p>Please log in to view the dogs.</p>}
    </div>
  );
};

export default Home;
