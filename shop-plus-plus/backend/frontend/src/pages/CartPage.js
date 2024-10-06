import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout.js';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { removeProduct,clearCart } from '../redux/cart/cartSlice.js';
import {Radio} from 'antd';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';
import "../styles/CartPage.css";

const CartPage = () => {

    const User=useSelector((state)=>state.user.user);
    const token=useSelector((state)=>state.user.token);
    const Cart=useSelector((state)=>state.cart.cart);
    const [address,setAddress]=useState(null);
    const [total,setTotal]=useState(0);
    const [clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // console.log(User.name)

    const getTotal=() =>{
        var total=0;
        Cart.forEach((element) => {
            total=total+(element.quantity*element.product.product.price);
        });
        setTotal(total);
    }

    //get payment gateway token
     const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [User]);

   //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const cart=Cart.map((element)=> {
        return {product:element.product.product, quantity:element.quantity}
      })
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/braintree/payment`, {
        nonce,
        cart,
        address,
        total,
        user:User.id
      },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
      });
      setLoading(false);
      dispatch(clearCart());
      
    //   navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

    useEffect(() => {
       getTotal()
    },[Cart])
  return (
    <Layout>
        <div className='cart-page '>
            <div className='row '>
                <div className='col-md-12'>
                    <h3 className='text-center bg-light p-2 mb-1'>
                        {User?`Hello ${User?.name}`
                        :`Hello Guest`}
                    
                    <p className='text-center'>
                        {Cart?.length>0?`You Have ${Cart.length} Product in your Cart `:"Your Cart is Empty"}
                    </p>
                    <p className='text-center'>{User ? "":"Please Login to Checkout"}</p>
                    </h3>
                </div>
            </div>
            <div className='row cart-container'>
                <div className='col-md-6 products'>
                  {Cart?.map((product) => (
                    <div className='row mb-4 card flex-row cart-product'>
                        <div className='col-md-4' width={"100px"}>
                            <img src={`${process.env.REACT_APP_API}/api/product-photo/${product.product.product._id}`}
                            className='card-img-top mt-4'
                            alt={product.product.product.name}
                            width="100%"
                            height={"140px"}/>
                        </div>
                        <div className='col-md-7 prod-info'>
                            <h4 className='mt-4'>{product.product.product.name}</h4>
                            <p>{product.product.product.description.substring(0,30)}</p>
                            <div className='d-flex' >
                            <h4 className='mb-4' >Price: ${product.product.product.price}</h4>
                            <h5>Quantity: {product.quantity}</h5>
                            </div>
                            <button className='btn btn-danger mb-4' onClick={()=>dispatch(removeProduct({id:product.product.product._id}))}>Remove</button>
                        </div>
                    </div>
                  ))}
                </div>
                <div className='col-md-3 cart-summary '>
                    <h2>Cart Summary</h2>
                <h5>Total | Checkout | Payment</h5>
                <hr/>
                <h4>Total: {total.toLocaleString('en-US',{
                    style: "currency",
                    currency:"USD",
                })
                }</h4>
                {User?
                <div className='addresses'>
                    <hr/>
                    <h5 className='text-center mt-4 mb-4'>Select Delivery Address</h5>
                    <Radio.Group onChange={(e) => setAddress(e.target.value)}>
                        
              {User?.addresses?.map((address) => (
                <div className='address-option' key={address._id}>
                  <Radio className='radio-btn' value={address}>
                    <p className='address-txt mb-2 mt-2'><b>Title:</b> {address.name}</p>
                    <p className='address-txt'><b>Address: </b>{address.address}</p>

                  </Radio>
                </div>
              ))}
            </Radio.Group>
                </div>
                :<button className='btn btn-outline-warning' 
                 onClick={()=> navigate('/login')}>Please Login to Checkout </button>}

                 <div className="mt-2">
                {!clientToken || !User || !Cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default CartPage