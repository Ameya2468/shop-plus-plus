import Product from "../../models/Product.js";

export const getSingleProduct= async (req,res) =>{
    try {
        const product = await Product.findOne({_id:req.params._id})
        .select("-photo");
        res.status(200).send({
            success: true,
            message:"Single Product Fetched",
            product,
        });
        
        
    } catch (error) {
       res.status(500).send({
        success:false,
        message:"Error while getting single product",
        error,
       })       
    }
}