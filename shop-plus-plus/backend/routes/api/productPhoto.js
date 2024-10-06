import Product from "../../models/Product.js"

export const productPhoto = async (req,res) =>{
    try {
        const product = await Product.findById(req.params._id).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error while getting photo",
            error
        })
    }
}