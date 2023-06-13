import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDogs, deleteDog, updateDog } from "../allDogs/allDogsSlice";

const AdminPage = () => {
  const dogs = useSelector((state) => state.dogs.allDogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDogs());
  }, [dispatch]);

  const handleDeleteDog = (id) => {
    if (window.confirm("Are you sure you want to delete this dog?")) {
      dispatch(deleteDog(id));
    }
  };

  const handleUpdateDog = (dog) => {
    // Prompt the user for the updated name and sponsor fee
    const updatedName = prompt("Enter the updated name:");
    const updatedSponsorFee = prompt("Enter the updated sponsor fee:");

    // Proceed with updating the dog if the input values are valid
    if (updatedName && updatedSponsorFee) {
      const updatedDog = { ...dog, name: updatedName, sponsorFee: updatedSponsorFee };
      dispatch(updateDog(updatedDog));
    }
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
