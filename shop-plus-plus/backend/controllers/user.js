import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const sign = (obj) =>
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
      if (error) {
        return reject(error);}

      return resolve(token);
    });
  });

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
      if (error) return reject();
      return resolve();
    });
  });

  export const signUpUser = async ({ name, email, password,phone,address }) => {
    
  try {
   
    const addresses=[address];
    const checkuser=await User.findOne({ email });
    if(checkuser){
     throw "Account with this emailId already exists";
    }
    const user = new User({ name, email, password,phone,addresses });
    await user.save();
    
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return Promise.resolve({
      user: { id: user._id, name: user.name },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if(!user){
      throw "Wrong Credentials";
    }
    await user.checkPassword(password);
    
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return Promise.resolve({
      user: { id: user._id, name: user.name,email:user.email,phone:user.phone,addresses:user.addresses },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const verifyToken = async (token) => {
  try {
    const user = jwt.decode(token);
    const findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      return Promise.reject({ error: "Unauthorized" });
    }
    // Verify Token and resolve
    await verify(token);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error: "Unauthorized" });
  }
};

export const updateUser= async (user)=>{
  try {
    const newuser=await User.findOneAndUpdate({email:user.email},{...user},{new:true});
    return Promise.resolve(newuser);
  } catch (error) {
    return Promise.reject({error:"some thing went Wrong"})
  }
}

export const updatePassword= async(data)=>{
  try {
    console.log(data);
    
    const user = await User.findOne({ email:data.email });
    console.log(user);
    await user.checkPassword(data.currentpswd);
    console.log("after pswd check")
    const hashedPasswd=bcrypt.hashSync(data.newpswd, 10);
    const newuser=await User.findOneAndUpdate({email:data.email},{password:hashedPasswd},{new:true});
   console.log("after update")
    return Promise.resolve(newuser);
    
  } catch (error) {
    return Promise.reject({error:error});
  }
}

export const deleteUser=async(req,res) =>{
  try {
    await User.findOneAndDelete({_id:req.body.id});
    res.status(200).send({
      message:"Account Deleted",
      success:true
    })
  } catch (error) {
    res.status(400).send({
      message: "Error in Deleting Account",
      error,
      success:false
    })
  }
}

// unused?
export const verifyUser = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      return resolve(user ? true : false);
    } catch {
      return reject(false);
    }
  });