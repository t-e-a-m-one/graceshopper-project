// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import AuthForm from '../features/auth/AuthForm';
// import Home from '../features/home/Home';
// import { me } from './store';
// import AllDogs from '../features/allDogs/AllDogs';
// import SingleDog from '../features/singleDog/SingleDog';
// import SignUpForm from '../features/auth/SignUpForm';
// import AdminPage from '../features/admin/AdminPage'; // Import the AdminPage component

// const AppRoutes = () => {
//   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
//   const isAdmin = useSelector((state) => state.auth.me.isAdmin); // Assuming you have a field for isAdmin in the user object

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(me());
//   }, []);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <Routes>
//           {isAdmin ? (
//             <Route path="/*" element={<AdminPage />} /> // Render AdminPage if user is admin
//           ) : (
//             <Navigate to="/home" replace /> // Redirect to home page for non-admin users
//           )}
//           <Route path="/home" element={<Home />} />
//           <Route path="/dogs" element={<AllDogs />} />
//           <Route path="/dogs/:id" element={<SingleDog />} />
//         </Routes>
//       ) : (
//         <Routes>
//           <Route
//             path="/*"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/login"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/signup"
//             element={<SignUpForm />}
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default AppRoutes;
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AllDogs from "../features/allDogs/AllDogs";
import SingleDog from "../features/singleDog/SingleDog";
import SignUpForm from "../features/auth/SignUpForm";
import AdminPage from "../features/admin/AdminPage"; // Import the AdminPage component

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin); // Assuming you have a field for isAdmin in the user object

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/*"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route
          path="/login"
          element={<AuthForm name="login" displayName="Login" />}
        />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {isAdmin ? (
        <Route path="/*" element={<AdminPage />} /> // Render AdminPage if user is admin
      ) : (
        <Route path="/*" element={<Navigate to="/home" replace />} /> // Redirect to home page for non-admin users
      )}
      <Route path="/home" element={<Home />} />
      <Route path="/dogs" element={<AllDogs />} />
      <Route path="/dogs/:id" element={<SingleDog />} />
    </Routes>
  );
};

export default AppRoutes;
