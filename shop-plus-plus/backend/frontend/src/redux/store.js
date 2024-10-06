import {combineReducers,configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import cartReducer from './cart/cartSlice.js';
import orderReducer from './orders/orderSlice.js';
import {persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user:userReducer,cart:cartReducer,order:orderReducer});

const persistConfig={
    key:"root",
    version:1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
});

export const persistor = persistStore(store);