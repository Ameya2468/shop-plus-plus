import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required: true,
        },
        phone:{
            type :String,
            required:true,
        },
        addresses:[{
            name:{
                type:String,
                required:true,
            },
            address:{
                type:String,
                required:true,
            } 
        }],
    }
)

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  
  this.password = bcrypt.hashSync(this.password, 10);
  ;
  next();
});


userSchema.methods.checkPassword = async function (password) {
  try {
   
    const match = await bcrypt.compare(password, this.password);
    
    if (match) {
      console.log("Password Matched")

      return Promise.resolve();
    }
    else{
      return Promise.reject("Wrong Password");
    }
    
  } catch (error) {
    
    return Promise.reject(error);
  }
};

const User=mongoose.model('users',userSchema);

export default User;