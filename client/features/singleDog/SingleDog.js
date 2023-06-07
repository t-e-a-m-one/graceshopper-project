import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleDog } from "../singleDog/singleDogSlice";
// import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SingleDog = () => {
  const user = useSelector((state) => state.user);
  const dog = useSelector((state) => state.singleDog.dog);
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("ID", id);
    dispatch(getSingleDog(id));
  }, [dispatch, id]);

  console.log("dog", dog);

  // const handleDogClick = (id) => {
  //   navigate(`/dogs/${id}`);
  // };

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
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
      <Typography variant="body2" color="text.secondary">
        Dogs:
      </Typography>
      {dog && dog.users && dog.users.length > 0 ? (
        <ul>
          {dog.users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
    <Link to="/dogs">Back to Dogs</Link>
  </Card>
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     sx={{ height: 140 }}
    //     image={dog.imageUrl}
    //     title={dog.name}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {dog.name}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Sponsor Fee: {dog.sponsorFee}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Gender: {dog.gender}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Dogs:
    //     </Typography>
    //     {dog && dog.users && dog.users.length > 0 ? (
    //       <ul>
    //         {dog.users.map((user) => (
    //           <li key={user.id}>
    //             <Link
    //               to={`/users/${user.id}`}
    //               // onClick={() => handleDogClick(dog.id)}
    //             >
    //               {user.name}
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>No users found</p>
    //     )}
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    //   <Link to="/dogs">Back to Dogs</Link>
    // </Card>
  );
};

export default SingleDog;













// import React, {useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSingleDog} from "../singleDog/singleDogSlice"
// import { useNavigate } from "react-router-dom";


// const SingleDog = () => {
//   //Pull In State
// const user = useSelector((state) => state)


// const dog = useSelector((state) => state.singleDog.dog);
// const {id} = useParams();
// const dispatch = useDispatch();
// const navigate = useNavigate();
// //useEffect
// useEffect(() => {
//   console.log("ID", id);
//   dispatch(getSingleDog(id));
// }, [dispatch, id]);
// console.log("dog", dog);

// const handleDogClick = (id) => {
//   navigate(`/dogs/${id}`);
// };

// if(!dog) {
//   return <div>Loading...</div>
// }
// return (
// //   <div>
// //   <img src={dog.imageUrl} alt={dog.name} />
// //   <h4>{dog.name}</h4>
// //   <p>Sponsor Fee: {dog.sponsorFee}</p>
// //   <p>gender: {dog.gender}</p>
// //   <h5>Dogs:</h5>
// //   {dog && dog.users && dog.users.length > 0 ? (
// //     <ul>
// //       {dog.users.map((user) => (
// //         <li key={user.id}>
// //           <Link to={`/users/${user.id}`} onClick={() =>handleDogClick(dog.id)}>
// //             {user.name}
// //           </Link>
// //         </li>
// //       ))}
// //     </ul>
// //   ) : (
// //     <p>Noooo</p>
// //   )}

// //   <Link to="/dogs">Back to Dogs</Link>
// // </div>
// <div>
// {user.isAuthenticated ? ( // Add the isAuthenticated check here
//   <>
//     <img src={dog.imageUrl} alt={dog.name} />
//     <h4>{dog.name}</h4>
//     <p>Sponsor Fee: {dog.sponsorFee}</p>
//     <p>Gender: {dog.gender}</p>
//     <h5>Dogs:</h5>
//     {dog && dog.users && dog.users.length > 0 ? (
//       <ul>
//         {dog.users.map((user) => (
//           <li key={user.id}>
//             <Link
//               to={`/users/${user.id}`}
//               onClick={() => handleDogClick(dog.id)}
//             >
//               {user.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <p>No users found</p>
//     )}
//     <Link to="/dogs">Back to Dogs</Link>
//   </>
// ) : (
//   <p>Please sign in to view the Single Dog component.</p> // Render this when the user is not authenticated
// )}
// </div>
// )
// }

// export default SingleDog;
