
import './App.css';
import React ,{useEffect} from 'react';
import Header from './Header.js';
import Login from './Login.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import Payment from './Payment.js';
import Orders from './Orders.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
const promise=loadStripe('pk_test_51I2XmTGPdgRFTPqOnNlDZafhf4aucMohqgMfJ63P0Rrcbe8pHY7pjEwc9tQce6FZ1cZEPg5kx1lYvDO8CPplkShW00QV7EPUEX');
function App() {
  const [{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch(
          {
            type:'SET_USER',
            user:authUser
          }
        )
      }else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }

    })
  },[])
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/orders">
        <div className="header">
           <Header/>
        </div>
          <Orders/>
        </Route>
        <Route path="/checkout">
        <div className="header">
           <Header/>
        </div>
          <Checkout/>
        </Route> 
        <Route path="/payment">
        <div className="header">
           <Header/>
        </div>
           <Elements stripe={promise}>
              <Payment/>
           </Elements>
          
        </Route>
        <Route path="/">
        <div className="header">
           <Header/>
        </div>
          <Home />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
