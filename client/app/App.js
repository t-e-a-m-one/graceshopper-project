import React from 'react';


import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import AllDogs from '../features/allDogs/AllDogs'
import SingleDog from '../features/singleDog/SingleDog'

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <AllDogs />
      <SingleDog />
    </div>

  );
};

export default App;
