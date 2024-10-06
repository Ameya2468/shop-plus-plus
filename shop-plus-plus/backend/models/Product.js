import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category: {
       type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    photo:{
        data:Buffer,
        contentType: String,
    }
});

const Product =mongoose.model('item',ProductSchema);
export default Product
