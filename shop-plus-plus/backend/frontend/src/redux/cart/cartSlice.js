import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[],
    loading:false,
};
//cart data will be of the form  {product:{},quantity:number}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addProduct(state,action){
             const itemtoadd={product:action.payload,quantity:1};
            state.cart=[...(state.cart),itemtoadd]
        },
        increaseQuantity(state,action){
            // const increased=(state.cart[action.payload].quantity)+1
             state.cart[action.payload].quantity+=1;
        },
        
        removeProduct(state,action){
        // state.cart=(action.payload).filter;
        // console.log(action.payload)
        const newcart=(state.cart).filter((p)=>p.product.product._id!==action.payload.id)
        state.cart=[...newcart];
        },

        clearCart(state){
          state.cart=[];
        }

    }
});

export const {addProduct,removeProduct,increaseQuantity,clearCart}=cartSlice.actions;
export default cartSlice.reducer;