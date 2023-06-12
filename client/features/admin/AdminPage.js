import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import  {fetchAllDogs, deleteDog, updateDog}  from "../allDogs/allDogsSlice";

const AdminPage = () => {
  const dogs = useSelector((state) => state.dogs.allDogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDogs());
  }, [dispatch]);

  const handleDeleteDog = (id) => {
    dispatch(deleteDog(id));
  };

  const handleUpdateDog = (dog) => {
    const updatedDog = { ...dog, name: "Updated Name" };
    dispatch(updateDog(updatedDog));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Dogs</h2>
      {dogs.map((dog) => (
        <div key={dog.id}>
          <p>{dog.name}</p>
          <p>{dog.sponsorFee}</p>
          <button onClick={() => handleDeleteDog(dog.id)}>Delete</button>
          <button onClick={() => handleUpdateDog(dog)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
