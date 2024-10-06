import Product from "../../models/Product.js";

 const getProduct= async (req,res) =>{
    try{
        const products = await Product.find({})
        .select("-photo")
        .limit(12);
    res.status(200).send({
        success:true,
        message:"AllProducts",
        products,
    });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error is getting products",
            error: error.message
        })
    }
}

export default getProduct