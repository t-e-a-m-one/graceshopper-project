/**
 * This file contains an `AllProducts` components to display all products.
 */

//Libraries 
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Files
import { fetchAllProductsAsync, selectAllProducts } from "./allProductSlice";

/**
 * AllProducts component. 
 */
const AllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1 className="allproductsheader"> All Products </h1>
      <div className="allProductsContainer">
        {allProducts.map((product, i) => {
          return (
            <div
              className="productcard"
              key={`inside the all products view ${i}`}
              >
              <img className="productImg" src={product.prodImg} />
              <Link to={`/allProducts/${product.id}`}>
                <h2 className="itemTitle">{product.prodName}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
