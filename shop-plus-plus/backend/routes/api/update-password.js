import { updatePassword } from "../../controllers/user.js";

export default async (req,res)=>{
    try {
        const pswds=req.body;
        console.log("hi")
        console.log(pswds);
        const newpswds=await updatePassword(pswds);
        console.log("hi");
        res.json({success:"true",newpswds});
      }         
     catch (error) {
        res.status(403).json({success:"false",error});
    }
}