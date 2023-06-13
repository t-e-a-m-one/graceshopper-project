import React, { useEffect, useState } from "react";
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

  const [genderFilter, setGenderFilter] = useState("all");
  const [sponsorFeeFilter, setSponsorFeeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchAllDogs());
  }, [dispatch]);

  const handleAddToCart = (dog) => {
    dispatch(addToCart(dog));
  };

  const handleClickDogs = (id) => {
    navigate(`/dogs/${id}`);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "gender") {
      setGenderFilter(value);
    } else if (name === "sponsorFee") {
      setSponsorFeeFilter(value);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filterDogs = (dogs) => {
    let filteredDogs = dogs;
    if (genderFilter !== "all") {
      filteredDogs = filteredDogs.filter((
        dog) => dog.gender.toLowerCase() === genderFilter.toLowerCase());
    }
    if (sponsorFeeFilter !== "all") {
      filteredDogs = filteredDogs.filter(
        (dog) => dog.sponsorFee === parseInt(sponsorFeeFilter, 10)
      );
    }
    return filteredDogs;
  };

  const sortDogs = (dogs) => {
    const sortedDogs = [...dogs];
    sortedDogs.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else if (sortOrder === "desc") {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }
      return 0;
    });
    return sortedDogs;
  };

  if (!dogs || dogs.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredDogs = filterDogs(dogs);
  const sortedDogs = sortDogs(filteredDogs);

  return (
    <div>
      <h1>All Dogs</h1>
      <div>
        <label>
          Gender:
          <select name="gender" value={genderFilter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Sponsor Fee:
          <select name="sponsorFee" value={sponsorFeeFilter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </select>
        </label>
        <label>
          Sort By Name:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {sortedDogs.map((dog) => (
        <Card
          key={dog.id}
          sx={{ maxWidth: 545 }}
          onClick={() => handleClickDogs(dog.id)}
        >
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
            <Button size="small">Share</Button>
            {/* <Button size="small">Learn More</Button> */}
            <Button size="small" onClick={() => handleAddToCart(dog)}>
              Add to Cart
            </Button>
            <Button size="large">💟</Button>
          </CardActions>
          <Link to={`/dogs/${dog.id}`}>View Details</Link>
        </Card>
      ))}
    </div>
  );
};

export default AllDogs;


















// import React, {useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllDogs} from "./allDogsSlice";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { addToCart } from "../checkout/cartSlice";

// const AllDogs = () => {
//   const dogs = useSelector((state) => state.dogs.allDogs);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAllDogs());
//   }, [dispatch]);

//   const handleAddToCart = (dog) => {
//     dispatch(addToCart(dog));
//   };

//   const handleClickDogs = (id) => {
//     navigate(`/dogs/${id}`);
//   };

//   if (!dogs || dogs.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>All Dogs</h1>
//       {dogs.map((dog) => (
//         <Card key={dog.id} sx={{ maxWidth: 545 }} onClick={() => handleClickDogs(dog.id)}>
//           {dog.imageUrl && (
//             <CardMedia sx={{ height: 140 }} image={dog.imageUrl} title={dog.name} />
//           )}
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {dog.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Sponsor Fee: {dog.sponsorFee}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Gender: {dog.gender}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Share</Button>
//             <Button size="small">Learn More</Button>
//             <Button size="small" onClick={() => handleAddToCart(dog)}>
//               Add to Cart
//             </Button>
//             <Button size="large">💟</Button>
//           </CardActions>
//           <Link to={`/dogs/${dog.id}`}>View Details</Link>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default AllDogs;






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
