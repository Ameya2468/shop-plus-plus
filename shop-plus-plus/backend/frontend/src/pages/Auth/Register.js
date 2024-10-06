import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast  from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import '../../styles/AuthStyles.css';

const Register = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[phone,setPhone]=useState("");
    const[addname,setAddName]=useState("");
    const[address,setAddress]=useState("");
    
     const navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault()
       
        const finaladd={name:addname,address:address};
        try{
            
           const res=await fetch(`${process.env.REACT_APP_API}/api/signup`,{
            method:"POST",
            mode:'cors',
            body:JSON.stringify({name:name,email:email,password:password,phone:phone,address:finaladd}),
             headers: {
                  "Content-Type": "application/json",
                  },
           }
           )
           const response=await res.json();
           
             if(response.error==="Account with this emailId already exists"){
                toast.error("Account with this emailId already exists");
             }
            //  else if( response.error[0].msg ==="'password' must have atleast 6 characters")
            //  {
            //     toast.error("'password' must have atleast 6 characters");
            //  }
             else{
                
               toast.success("Registered Successsfully");
               navigate("/login");
             }
        
        }catch(error){
                 toast.error("Some Thing Went Wrong");
        }
        
    }

  return (
    <Layout>
        <div className="register form-container">
            
       <form onSubmit={handleSubmit}>
        <h1 className='title'>User Registration</h1>
        <div className="mb-3">
         <label htmlFor="exampleInputName1" className="form-label">Name</label>
         <input type="text" className="form-control" id="exampleInputName1" aria-describedby="NameHelp" placeholder='Enter Your Name' value={name} onChange= {(e)=>setName(e.target.value)} required />
         </div>
        <div className="mb-3">
         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email address' value={email} onChange= {(e)=>setEmail(e.target.value)} required/>
         </div>
        <div className="mb-3">
         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
         <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' value={password} onChange= {(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="mb-3">
         <label htmlFor="exampleInputPhone1" className="form-label">Phone No</label>
         <input type="text" className="form-control" id="exampleInputPhone1" placeholder='Enter Your Phone No' value={phone} onChange= {(e)=>setPhone(e.target.value)} required/>
         </div>
           <div className="mb-3">
         <label htmlFor="exampleInputPhone1" className="form-label">Address</label>
         <input type="text" className="form-control" id="exampleInputaddname1" placeholder='Enter Your Address Title' value={addname} onChange= {(e)=>setAddName(e.target.value)} required/>
         <textarea className="form-control" id="exampleInputaddress1" placeholder='Enter Your Address' value={address} onChange= {(e)=>setAddress(e.target.value)} required />
         </div>
          
        <button type="submit" className="btn btn-primary">REGISTER</button>
      </form>
     </div>
    </Layout>
    
  )
}

export default Register