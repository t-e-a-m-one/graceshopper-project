import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    // Fetch the list of users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch the list of dogs from the backend API
    const fetchDogs = async () => {
      try {
        const response = await axios.get('/api/admin/dogs');
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchUsers();
    fetchDogs();
  }, []);

  const deleteDog = async (dogId) => {
    try {
      await axios.delete(`/api/admin/dogs/${dogId}`);
      // Update the dogs list after deletion
      setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== dogId));
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>List of Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            Dog Name: {dog.name}, Sponsor Fee: {dog.sponserFee}, Gender: {dog.gender}, Image: {dog.imageUrl}
            <button onClick={() => deleteDog(dog.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Username: {user.username}, Email: {user.email}, Address: {user.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
