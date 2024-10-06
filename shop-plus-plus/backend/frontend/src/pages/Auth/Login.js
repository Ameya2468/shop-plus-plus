import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast  from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import '../../styles/AuthStyles.css';
import { loginSuccess } from '../../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

const Login = () => {
    
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit=async (e)=>{
        e.preventDefault()
       try{
           const res=await fetch(`${process.env.REACT_APP_API}/api/login`,{
            method:"POST",
            mode:'cors',
            body:JSON.stringify({email:email,password:password}),
             headers: {
                  "Content-Type": "application/json",
                  },
           }
           )
           const response=await res.json();
           
             if(response.error==="Wrong Credentials"){
                toast.error("Wrong Credentials");
             }
             else if(response.error==="Wrong Password"){
              toast.error("Wrong Credentials");
             }
             else{
               toast.success("Login Successsful");
               console.log(response);
               dispatch(loginSuccess({user:response.user, token:response.token}))
               
               navigate("/");
             }
        
        }catch(error){
                 toast.error("Some thing Went Wrong");
        }
        
    }

  return (
    <Layout>
        <div className="form-container">
            
       <form onSubmit={handleSubmit}>
        <h1 className='title'>Login</h1>
        <div className="mb-3">
         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email address' value={email} onChange= {(e)=>setEmail(e.target.value)} required/>
         </div>
        <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
         <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' value={password} onChange= {(e)=>setPassword(e.target.value)} required/>
        </div>
        
          
        <button type="submit" className="btn btn-primary">LOGIN</button>
      </form>
     </div>
    </Layout>
    
  )
}

export default Login