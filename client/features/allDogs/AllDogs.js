import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDogs} from "./allDogsSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const AllDogs = () => {
  //Pull in State
  const dogs = useSelector((state) => state.dogs.allDogs);
  const dispatch = useDispatch();
const navigate = useNavigate();

  //useEffect
useEffect(() =>{
  dispatch(fetchAllDogs());
}, [dispatch]);
 console.log("DOGS", dogs);

 const handleClickDogs = (id) => {
  navigate(`/dogs/${id}`);
 };
 if(!dogs || dogs.length === 0) {
  return <div>Loading...</div>
 }
 console.log("imageUrl2:", dogs.imageUrl)

 return (
  <div>
    <h1>All Dogs</h1>
      {dogs.map((dog) => (
  <div key={dog.id} onClick={() => handleClickDogs(dog.id)}>
    <Link to={`/dogs/${dog.id}`}>
      <h3>{dog.name}</h3>
    </Link>
    <p>{dog.sponsorFee}</p>
    <p>{dog.gender}</p>
    <img src={dog.imageUrl} alt={dog.name} />
  </div>
))}
</div>
);
}

export default AllDogs;
