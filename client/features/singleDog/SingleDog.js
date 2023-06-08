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
import { addCartItemAsync } from "../cart/cartSlice";

const SingleDog = () => {
  const dog = useSelector((state) => state.singleDog.dog);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id); // Access the user ID from the auth slice

  useEffect(() => {
    dispatch(getSingleDog(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addCartItemAsync({ dogId: dog.id, userId: userId }));
  };

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 545 }}>
      {dog.imageUrl && (
        <CardMedia sx={{ height: 140 }} image={dog.imageUrl} title={dog.name} />
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
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
      <Link to="/dogs">Back to Dogs</Link>
    </Card>
  );
};

export default SingleDog;
