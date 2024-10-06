import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout.js";
import axios from "axios";
import {Checkbox,Radio} from 'antd';
import {Prices} from "../components/Prices.js"
import { useSelector } from 'react-redux';
import "../styles/HomePage.css"
import Addtocart from '../components/addtocart.js';
const HomePage = () => {
  const navigate = useNavigate();
  const User = useSelector((state)=> state.user.user);
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/get-category`);
      console.log(data);
      if(data?.success){
        setCategories(data?.category);
       
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllCategory();
    getTotal();
  },[]);

  //get products
  const getAllProducts = async () =>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

   //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts();
   
  },[checked.length,radio]);

  useEffect(() => {
    if(checked.length || radio.length) filterProduct()
  },[checked.length,radio]);

   // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(checked);
  };

  

  //get filterd product
  const filterProduct = async () => {
    try {
      console.log(checked,radio);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <>
        <Layout title={"All Products - Best offers"}>
           {User? <p className='welcome-txt'>Welcome {User.name}. <br></br>Search for Products and Add To Cart. </p>:
           <p className='welcome-txt'>Welcome Guest.<br></br> Please Login to Place Orders. </p>}
            <div className=' container-fluid row mt-3 home-page'>
              <p className=''></p>
              <div className='col-md-3 filters'>
                <h4 className=' text-center mt-4'>Filter By Category</h4>
                <div className='d-flex flex-column'>
                {categories?.map((c) =>(
                  <Checkbox className="check-btn" key={c._id} onChange={(e) =>handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))}
                </div>
              
              {/* price filter  */}
          <h4 className=" text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio className='radio-btn' value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          
            <div className='col-md-9  '>
              {/* {JSON.stringify(radio,null,4)} */}
              <h1 className='text-center'>All Products</h1>
              <div className='d-flex flex-wrap md-5'>
                {products?.map((product) =>(
                    <div key={product._id} className='card m-5' style={{width:"20rem"}}>
                  <img src={`${process.env.REACT_APP_API}/api/product-photo/${product._id}`}
                   className='card-img-top'
                   alt={product.name}/>
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description.substring(0,30)}...</p>
                    <p className='card-name-price'>$ {product.price}</p>
                    <button className='btn btn-primary ms-2' 
                    onClick={() => navigate(`/product/${product._id}`)}>More Details</button>
                    <Addtocart product={product}/>
                    {/* <button 
                    className='btn btn-secondary ms-2 mt-2'
                    onClick={()=>{}}
                    >Add To Cart</button> */}
                  </div>
                </div>
                ))}
              </div>
              <div className='m-2 p-3'>
                {products && products.length < total &&(
                  <button
                  className='btn  btn-warning loadmore'
                  onClick={(e)=>{
                    e.preventDefault();
                    setPage(page+1);
                  }}>
                  {loading ? "Loading...":"Loadmore"}
                  </button>
                )}
              </div>
            </div>
              
            </div>
        </Layout>
        </>
    
  )
}

export default HomePage