import { updateUser } from "../../controllers/user.js";

export default async (req,res)=>{
    try {
        console.log(res.body);
        const user=req.body;
        const newuser=await updateUser(user);
        res.json({success:"true",newuser});
      }         
     catch (error) {
        res.status(403).json({success:"false",error});
    }
}
