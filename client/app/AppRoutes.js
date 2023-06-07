import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import AllDogs from '../features/allDogs/AllDogs';
import SingleDog from '../features/singleDog/SingleDog';
import SignUpForm from '../features/auth/SignUpForm';


const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthForm name="login" displayName="Login" />} />
            <Route path="/" element={<AuthForm name="Sign Up" displayName="Sign Up" />} />
            {/* <Route path="/login" element={<AuthForm name="login" displayName="Login" />} /> */}
          </> // I took this out because we already have "/" that leads to login, feels unnecessay - Fanfan
        )}

        {/* Added routes for AllDogs and SingleDog */}
        <Route path="/dogs" element={<AllDogs />} />
        <Route path="/dogs/:id" element={<SingleDog />} />
      </Routes>
      {/* {!isLoggedIn && (
        <AuthForm name="signup" displayName="Sign Up" />
      )} */}
    </div>
  );
};

export default AppRoutes;
