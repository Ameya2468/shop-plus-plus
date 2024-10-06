import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products:[
        {
            product:{
                type:mongoose.ObjectId,
                ref:"item"
            },
            quantity:{
                type:Number,
                required:true
            }
        }],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","delivered"]
    },
    address:{
        
            name:{
                type:String,
                required:true,
            },
            address:{
                type:String,
                required:true,
            } 
        
    }
},{timestamps:true})

const Order = mongoose.model('Order',orderSchema);
export default Order