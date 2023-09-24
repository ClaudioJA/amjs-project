import React, {useState} from 'react';
import logo from './logo.svg';
import './SubApp.css';
import store from '../../component/myProductList';

function SubApp() {
  const [number, setNum] = useState(0);

  const List = store.store.getState();

  const currCoin = List.count;

  const handleClick = () => {
    setNum(Math.floor(Math.random() * 100) + 1);
  }

  const Possibility = () => {
    handleClick;
    if(number > 0 && number < 10){
      store.store.dispatch({
        type:'GOLD'
      });
    }
    else if(number > 9 && number < 50){
      store.store.dispatch({
        type:'SILVER'
      });
    }
    else if(number > 49 && number < 101){
      store.store.dispatch({
        type:'BRONZE'
      });
    }
  }

  return (
    <div>
      <h2>Hello</h2>
      <h2>Coin Count : {currCoin}</h2>
      <button onClick={Possibility}>Break Egg</button>
      
    </div>
  );
}

export default SubApp;
