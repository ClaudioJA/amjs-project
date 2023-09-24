import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {Products, AddToCartAction, State, RemoveFromCartAction} from '../interface/Product';
import React, { useState, useEffect } from 'react';
import {createStore} from 'redux';

const initialState: State = {
    products: [],
    count: 200
};

const persistConfig = {
    key: 'root',
    storage
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return{
                ...state,
                products: [...state.products, action.payload],
                count: state.count - action.payload.price
            };
        case 'REV_FRO_CART':
            return{
                ...state,
                products: state.products.filter((product) => product.id !== action.payload.id),
                count: state.count + action.payload.price
            };
        case 'ADD_COIN':
            return{
                ...state,
                count: state.count + action.payload
            };
        case 'BRONZE':
            return{
                ...state,
                count: state.count + 25
            };
        case 'SILVER':
            return{
                ...state,
                count: state.count + 50
            };
        case 'GOLD':
            return{
                ...state,
                count: state.count + 100
            };
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default {store, persistor};