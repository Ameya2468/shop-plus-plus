import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.js";
import { storeOrder } from "../redux/orders/orderSlice.js";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";
import "../styles/OrderStyles.css";

const Orders = () => {
  const User = useSelector((state)=>state.user.user);
  const token = useSelector((state)=> state.user.token);
  const Order=useSelector((state)=> state.order.orders);
  const dispatch = useDispatch();
  const getOrders = async () => {
    try {
      console.log("hi")
      console.log(User.id)
      const  {data}  = await axios.get(`${process.env.REACT_APP_API}/api/orders/${User.id}`,{
      headers:{
            'Authorization': `Bearer ${token}`
       }
      });
      dispatch(storeOrder(data))
       console.log(data);
      console.log(Order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
     getOrders();
  }, []);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3  dashboard">
        <div className="row">
          
          <div className="col-md-9 container">
            <h1 className="text-center">All Orders</h1>
            {Order?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead className="text-center">
                      <tr className="title">
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Address</th>
                        <th scope="col"> Date</th>
                        <th scope="col">Payment</th>
                        
                      </tr>
                    </thead>
                    <tbody className="text-center ">
                      <tr className="order-info">
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.address.address}</td>
                        {/* <td>{moment(o?.createAt).fromNow()}</td> */}
                        <td> {(o?.createdAt).substring(0,10)}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p.product._id}>
                        <div className="col-md-4 img-container">
                          <img
                            src={`${process.env.REACT_APP_API}/api/product-photo/${p.product._id}`}
                            className="card-img-top"
                            alt={p.product.name}
                            width="100px"
                            height={"200px"}
                          />
                        </div>
                        <div className="col-md-8 product-info">
                          <p className="prod-name">{p.product.name}</p>
                          <p className="prod-desc">{p.product.description.substring(0, 60)}</p>
                          <p className="prod-price">Price : $ {p.product.price}</p>
                          <p className="prod-quantity">Quantity : {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;