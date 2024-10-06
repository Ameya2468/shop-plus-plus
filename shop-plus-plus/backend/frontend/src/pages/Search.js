import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import Addtocart from '../components/addtocart.js';
import "../styles/HomePage.css";
const Search = () => {
  const navigate=useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((product) => (
              <div className="card m-5" style={{ width: "20rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/product-photo/${product._id}`}
                  className="card-img-top m-3"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {product.price}</p>
                  <button class="btn btn-primary ms-1 mt-2"
                  onClick={() => navigate(`/product/${product._id}`)}>More Details</button>
                  {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                   <Addtocart product={product}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;