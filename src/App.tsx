import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayMyProduct from './component/DisplayProductList';
import { Route, Routes } from 'react-router-dom';
import Product_List from './component/productlist';
import SubApp from './subapp-egg/src/SubApp'

function App() {
  return (

    <Routes>
      <Route path="/" element={<Product_List />} />
      <Route path="/productlist/" element={<DisplayMyProduct />} />
      <Route path="/egg/" element={<SubApp />} />
    </Routes>


  )
}

export default App;
