import React from 'react';


import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

// import AllDogs from '../features/allDogs/AllDogs'
// import SingleDog from '../features/singleDog/SingleDog'
import SignUpForm from '../features/auth/SignUpForm'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <SignUpForm />
      {/* <AllDogs />
      <SingleDog /> */}
    </div>

  );
};

export default App;
