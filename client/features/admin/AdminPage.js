import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDogs, deleteDog, updateDog } from "../allDogs/allDogsSlice";
import './AdminPage.css'; // Import CSS file for styling

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
    <div className="admin-page">
      <h1>Admin Page</h1>
      <h2>Dogs</h2>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img src={dog.imageUrl} alt={dog.name} />
            <p><strong>Name:</strong> {dog.name}</p>
            <p><strong>Sponsor Fee:$</strong> {dog.sponsorFee}</p>
            <button onClick={() => handleDeleteDog(dog.id)}>Delete</button>
            <button onClick={() => handleUpdateDog(dog)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
