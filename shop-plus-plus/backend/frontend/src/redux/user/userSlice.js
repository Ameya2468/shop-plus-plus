import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    token: null,
    isAuthenticated:false,
    error:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginSuccess(state,action){
            state.user = action.payload.user;
            state.token=action.payload.token;
            state.isAuthenticated=true;
        },
        
        logout(state){
            state.user=null;
            state.token = null;
            state.isAuthenticated=false;
        },
        updateUser(state,action){
           state.user = {...action.payload}
        }

    }
});

export const {loginSuccess,logout,updateUser}=userSlice.actions;
export default userSlice.reducer;