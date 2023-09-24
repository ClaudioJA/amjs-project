import {Products, AddToCartAction, State} from '../interface/Product';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {createStore} from 'redux';
import { useSelector } from 'react-redux';
import store from './myProductList';
import persistor from './myProductList';
import produce from 'immer';


function Product_List() {
    const [productList, setProductList] = useState<Products[]>([]);
    const [isVisible, toggleVisible] = useState<boolean>(false);
    const testProduct: Products ={id:999, title:"s", price:0, description:"s", image:"s", rating:"s"};
    const [currentProduct, setProduct] = useState<Products>(testProduct);
    const [ViewMode, changeView] = useState<boolean>(true);

    
    const List = store.store.getState();

    const existed = List.products.find(products => products.id === currentProduct.id);

    const isSame = existed ? true : false;

    const currCoin = List.count;

    // const unsubscribe = store.store.subscribe(() => {
    //     console.log('State has changed:', store.store.getState());
    // });

    console.log("Test")

    axios.get('https://fakestoreapi.com/products').then(response => { setProductList(response.data); })
    
    return (
        <div style={{width:'100%'}}>
            <div style={{height:'70%', width: '60%', marginLeft:'20%', marginTop:'5%' , position:'fixed', border:'1px solid black', backgroundColor:'white', display:isVisible?"inline":"none"}}>
                <div style={{width:"100%", height:"100%", display:"flex", justifyContent:'center', justifyItems:'center', wordWrap:'break-word'}}>
                <img style={{width:100, height:100}} src={currentProduct.image} alt="" /><br />
                {currentProduct.title}<br />
                IDR {currentProduct.price}<br />
                Description :<br />
                {currentProduct.description}

                <button onClick={()=>{
                    if(isSame == true){
                        store.store.dispatch({
                            type:'REV_FRO_CART', payload:currentProduct
                        });
                    }
                    else if(isSame == false && currCoin > currentProduct.price){
                        store.store.dispatch({
                            type:'ADD_TO_CART', payload:currentProduct
                        });
                        console.log("Done");
                        
                    }
                }}>{isSame ? 'Sell' : 'Buy'}</button>
                </div>
            </div>
            <div>Coin Count : {currCoin}</div>
            <button onClick={()=>
                store.store.dispatch({
                    type:'SELL_PRO',
                    payload:100,
                })
            }>Add</button>
            <h2>Product List</h2>
            <button onClick={()=> changeView(!ViewMode)}>Change View</button><br/>
            <div style={{display:ViewMode?'block':'flex', width:'100%', height:'auto', backgroundColor:'blue'}}>
                {productList.map((product) => (
                    <div key={product.id}>
                        <button onClick={()=> {setProduct(product); toggleVisible(!isVisible)}} style={{width:ViewMode?'100%':400, height:ViewMode?'auto':400, overflow:'auto'}}>
                        <div>
                            <img style={{width:100, height:100}} src={product.image} alt="" /><br />
                            {product.title}<br />
                            IDR {product.price}<br />
                            Description :<br />
                            {product.description}
                        </div></button>
                        <br /><br />
                    </div>
                ))}  
            </div>
        </div>
    );
}

export default Product_List;