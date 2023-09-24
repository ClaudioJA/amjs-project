import { useSelector } from 'react-redux';
import {Products, AddToCartAction} from '../interface/Product';
import React, { useState, useEffect } from 'react';
import {State} from '../interface/Product'
import store from './myProductList';
import coinCount from './CoinValue';

function DisplayMyProduct() {
  const List = store.store.getState();

  const testProduct: Products ={id:999, title:"s", price:0, description:"s", image:"s", rating:"s"};
  const [currentProduct, setProduct] = useState<Products>(testProduct);
  const [isVisible, toggleVisible] = useState<boolean>(false);
  const [ViewMode, changeView] = useState<boolean>(true);

  const existed = List.products.find(products => products.id === currentProduct.id);

  const isSame = existed ? true : false;

  const currCoin = coinCount.coinCount.getState();

  
  return (
    <div>
      <div>Coin Count : {currCoin.count}</div>
            <button onClick={()=>
                coinCount.coinCount.dispatch({
                    type:'SELL_PRO',
                    payload:100,
                })
            }>Add</button>
      <h2>My Product List</h2>
      <button onClick={()=> changeView(!ViewMode)}>Change View</button><br/>
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
                    else if(isSame == false && currCoin.count > currentProduct.price){
                        store.store.dispatch({
                            type:'ADD_TO_CART', payload:currentProduct,
                        });
                    }
                }}>{isSame ? 'Sell' : 'Buy'}</button>
          </div>
      </div>

      <div style={{display:ViewMode?'block':'flex', width:'100%', height:'auto', backgroundColor:'blue'}}></div>
        {List.products.map((product) => (
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
  );
}

export default DisplayMyProduct;