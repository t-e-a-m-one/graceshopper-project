import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleDog } from "../singleDog/singleDogSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../checkout/cartSlice";
import "./SingleDog.css";

const SingleDog = () => {
  const dog = useSelector((state) => state.singleDog.dog);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSingleDog(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = (dog) => {
    dispatch(addToCart(dog));
  };

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
    <Card class="singledog" sx={{ maxWidth: 545 }}>
      {dog.imageUrl && (
        <CardMedia
          id="dogimage"
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
          Sponsor Fee: ${dog.sponsorFee}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {dog.gender}
        </Typography>
        {dog && dog.users && dog.users.length > 0 && (
          <ul>
            {dog.users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleAddToCart(dog)}>
          Add to Cart
        </Button>
      </CardActions>
      <Link to="/dogs">Back to Dogs</Link>
    </Card>
  );
};

export default SingleDog;
