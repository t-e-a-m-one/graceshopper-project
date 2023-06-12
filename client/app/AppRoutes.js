import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import AllDogs from '../features/allDogs/AllDogs';
import SingleDog from '../features/singleDog/SingleDog';
import Admin from '../features/admin/Admin';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me);
  const isAdmin = useSelector((state) => state.auth.me?.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {isLoggedIn && isAdmin ? (
          <>
            <Route path="/" element={<Admin />} />
          </>
        ) : isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dogs" element={<AllDogs />} />
            <Route path="/dogs/:id" element={<SingleDog />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthForm name="login" displayName="Login" />} />
            <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
