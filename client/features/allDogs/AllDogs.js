import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllDogs } from "./allDogsSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../checkout/cartSlice";

const AllDogs = () => {
  const dogs = useSelector((state) => state.dogs.allDogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllDogs());
  }, [dispatch]);

  const handleAddToCart = (dog) => {
    dispatch(addToCart(dog));
  };

  const handleClickDogs = (id) => {
    navigate(`/dogs/${id}`);
  };

  if (!dogs || dogs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Dogs</h1>
      {dogs.map((dog) => (
        <Card
          key={dog.id}
          sx={{ maxWidth: 545 }}
          onClick={() => handleClickDogs(dog.id)}
        >
          {dog.imageUrl && (
            <CardMedia
              sx={{ height: 140 }}
              image={dog.imageUrl}
              title={dog.name}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dog.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sponsor Fee: {dog.sponsorFee}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gender: {dog.gender}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
            <Button size="small" onClick={() => handleAddToCart(dog)}>
              Add to Cart
            </Button>
            <Button size="small">Favorite</Button>
          </CardActions>
          <Link to={`/dogs/${dog.id}`}>View Details</Link>
        </Card>
      ))}
    </div>
  );
};

export default AllDogs;

// const AllDogs = () => {
//   //Pull in State
//   const dogs = useSelector((state) => state.dogs.allDogs);
//   const dispatch = useDispatch();
// const navigate = useNavigate();

//   //useEffect
// useEffect(() =>{
//   dispatch(fetchAllDogs());
// }, [dispatch]);
//  console.log("DOGS", dogs);

//  const handleClickDogs = (id) => {
//   navigate(`/dogs/${id}`);
//  };
//  if(!dogs || dogs.length === 0) {
//   return <div>Loading...</div>
//  }
//  console.log("imageUrl2:", dogs)

//  return (
//   <div>
//     <h1>All Dogs</h1>
//       {dogs.map((dog) => (
//   <div key={dog.id} onClick={() => handleClickDogs(dog.id)}>
//     <Link to={`/dogs/${dog.id}`}>
//       <h3>{dog.name}</h3>
//     </Link>
//     <p>{dog.sponsorFee}</p>
//     <p>{dog.gender}</p>
//     <img src={dog.imageUrl} alt={dog.name} />
//   </div>
// ))}
// </div>
// );
// }

// export default AllDogs;
