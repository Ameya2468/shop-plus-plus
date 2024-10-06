import { verifyToken } from "../controllers/user.js";

const protectApi = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    
    if (authorization) {
      // verify the JWT token here
      
      const token = authorization.split(" ")[1]; // Bearer abcdef
      await verifyToken(token);
      return next();
    }
     
    res.status(403).json({success:"false", error: "Unauthorized access!" });
  } catch (error) {
    res.status(403).json({ success:"false",error: "Unauthorized access!" });
  }
};

export default protectApi;
