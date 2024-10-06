import React from 'react'
import Layout from '../components/Layout/Layout.js';
import { useSelector,useDispatch } from 'react-redux';
import { logout, updateUser } from '../redux/user/userSlice.js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const User = useSelector((state) => state.user.user);
  const token=useSelector((state)=> state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(User.name);
  const [phone, setPhone] = useState(User.phone);
  const [address, setAddress] = useState("");
  const [title,setTitle]=useState("");
  const [currentpswd,setCurrentpswd]=useState("");
  const[newpswd,setNewpswd]=useState("");

  const deleteHandler= async() =>{
       const confirmBox=window.confirm("Do you really want to Delete your Account ?")
       if(confirmBox === true){
        dispatch(logout())
        const res=await fetch(`${process.env.REACT_APP_API}/api/delete`,{
            method:"DELETE",
            body:JSON.stringify({id:User.id}),
            headers:{
              'Authorization':`Bearer ${token}`,
              "Content-Type": "application/json"
            }

          })

          const response=await res.json() 
          if(response.success===false){
            toast.error("Delete Failed")
          }
          else{
            toast.success("Account Deleted Successfully")
          }
       }
  }

  const updateHandler=async(newuser) =>{
        try {
          const res=await fetch(`${process.env.REACT_APP_API}/api/updateprofile`,{
            method:"PUT",
            body:JSON.stringify(newuser),
            headers:{
              'Authorization':`Bearer ${token}`,
              "Content-Type": "application/json"
            }

          })
          
          const response =await res.json();
          console.log(response);
          if(response.success==="false"){
            if(response.error==="Unauthorized access!"){
              toast.error("Unauthorized access!")
              dispatch(logout())
              navigate("/login")
            }
            throw response.error;
          }
          dispatch(updateUser(newuser))
          toast.success("Update Successful")
        } catch (error) {
          toast.error(error);
          
        }
  }

  const addAddress=async(address) =>{
    try {
        const check=(User.addresses).find((add)=> address.name===add.name)
        if(check){
          throw "Multiple Address cannot have the Same title"
        }
        const newuser={...User,addresses:[...User.addresses,address]};
        const res=await fetch(`${process.env.REACT_APP_API}/api/updateprofile`,{
            method:"PUT",
            body:JSON.stringify(newuser),
            headers:{
              'Authorization':`Bearer ${token}`,
              "Content-Type": "application/json"
            }

          })
          
          const response =await res.json();
          
          if(response.success==="false"){
            if(response.error==="Unauthorized access!"){
              toast.error("Unauthorized access!")
              dispatch(logout())
              navigate("/login")
            }
            throw response.error;
          }
        dispatch(updateUser(newuser))
        toast.success("Update Successful")
    } catch (error) {
      toast.error(error)
    }
  }


  const deleteAddress=async(addresstitle)=>{
    try {
      console.log(addresstitle);
      const newaddresses=(User.addresses).filter((address)=>address.name!==addresstitle)
      console.log(newaddresses);
      const newuser={...User,addresses:newaddresses}
      const res=await fetch(`${process.env.REACT_APP_API}/api/updateprofile`,{
            method:"PUT",
            body:JSON.stringify(newuser),
            headers:{
              'Authorization':`Bearer ${token}`,
              "Content-Type": "application/json"
            }

          })
          
          const response =await res.json();
          console.log(response);
          if(response.success==="false"){
            if(response.error==="Unauthorized access!"){
              toast.error("Unauthorized access!")
              dispatch(logout())
              navigate("/login")
            }
            throw response.error;
          }
      dispatch(updateUser(newuser))
    } catch (error) {
      toast.error(error);
    }
  }

  const changePassword=async(passwords)=>{
    try {
      const user={email:User.email,...passwords}
      const res=await fetch(`${process.env.REACT_APP_API}/api/updatepassword`,{
            method:"PATCH",
            body:JSON.stringify(user),
            headers:{
              'Authorization':`Bearer ${token}`,
              "Content-Type": "application/json"
            }
           })
        const response= await res.json();
        console.log(response.error)
        if(response.success==="false"){
            if(response.error==="Unauthorized access!"){
              toast.error("Unauthorized access!")
              dispatch(logout())
              navigate("/login")
            }
            throw response.error;
          }
        else{
          toast.success("Password Updation Successful")
        }
      
    } catch (error) {
       toast.error(error.error);
    }

  }
  return (
    <Layout>
      <h1 className='text-3xl font-semibold text-center my-7' id='title'>Profile</h1>
      <button className='delete-button' onClick={deleteHandler} >Delete Account</button>
        <div className='profile-update'>


          <div id='username' className='update-div'>
            <h3 className='update-title'>Username</h3>
            <input 
            type='text' 
            value={name} 
            className='update-input' 
            defaultValue={User.name}
            onChange={(e)=>setName( e.target.value )}/>
            <button className='update-button' 
            onClick={()=>updateHandler({...User,name:name})} >
            Update</button>
          </div>


           <div id='password' className='update-div'>
            <h3 className='update-title'>Password</h3>
            <h5>Current Password</h5>
            <input type='password' 
            className='update-input' 
            placeholder='Enter your Current Password'
            value={currentpswd}
            onChange={(e)=>setCurrentpswd(e.target.value)}
            />
            <h5>New Password</h5>
            <input type='password' 
            className='update-input' 
            placeholder='Enter New Password'
            value={newpswd}
            onChange={(e)=>setNewpswd(e.target.value)}
            />
            <button className='update-button'
            onClick={()=>changePassword({currentpswd:currentpswd,newpswd:newpswd})}>
              Update</button>
          </div>


           <div id='Phone Number' className='update-div'>
            <h3 className='update-title'>Phone Number</h3>
            <input type='text' 
            className='update-input' 
            value={phone}
            defaultValue={User.phone}
            onChange={(e)=>setPhone( e.target.value )}/>
            <button className='update-button'
            onClick={()=>updateHandler({...User,phone:phone})}>Update</button>
          </div>


          <div className='address-display'>
            <h3 className='update-title'>Your Addresses</h3>
            {(User.addresses).map((address) => 
              <div className='address-container'>
                <h5>Title:</h5>
                <div>{address.name}</div>
                <h5>Address:</h5>
                <div>{address.address}</div>
                <button className="address-delete" value={address.name}
                onClick={()=>deleteAddress(address.name)}>Delete </button>
              </div>
            )}
          </div>


           <div id='Address' className='update-div'>
            <h4 className='update-title'>Add New Address</h4>
            <h5>Title:</h5>
            <input type='text' 
            value={title} 
            className='update-input' 
            placeholder='Enter Address Title' 
            onChange={(e)=>setTitle(e.target.value)}/>
            <h5>Address:</h5>
            <textarea className='update-input' 
            placeholder='Enter new Address'
            value={address}
            onChange={(e)=>setAddress(e.target.value)}/>

            <button className='update-button' 
            onClick={()=>addAddress({name:title,address:address})}>
            Add</button>
          </div>


        </div>
    </Layout>
    
  )
}

export default Profile