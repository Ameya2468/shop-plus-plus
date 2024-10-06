import React from 'react'
import "../styles/HomePage.css"
import toast from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import { addProduct,increaseQuantity } from '../redux/cart/cartSlice';
const Addtocart = (product) => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleAddtocart =(product)=>{
        // const itemtoadd={product:product,quantity:1};
        
        const findprod=(cart).find((p)=> p.product.product._id===product.product._id)
        const index=cart.indexOf(findprod)
        if(index!==-1){
            dispatch(increaseQuantity(index))
            toast.success("item Added")
        }
        else{
            dispatch(addProduct(product))
            toast.success("Item Added To Cart ")
        }

    }

  return (
    <button 
     className='btn btn-secondary ms-2 mt-2'
    onClick={()=> handleAddtocart(product)}
    >Add To Cart</button>
  )
}

export default Addtocart