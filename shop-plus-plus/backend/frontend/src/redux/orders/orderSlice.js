import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orders:[],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        storeOrder(state,action){
            state.orders=action.payload;
        }
    }

})

export const {storeOrder}=orderSlice.actions;
export default orderSlice.reducer;