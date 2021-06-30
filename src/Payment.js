import React,{useState,useEffect} from 'react';
import CheckoutProduct from './CheckoutProduct.js';
import { useStateValue } from './StateProvider.js';
import './Payment.css';
import {Link,useHistory} from "react-router-dom";
import {getBasketTotal} from './reducer.js';
import axios from "./axios";
import { db } from "./firebase";
import CurrencyFormat from "react-currency-format";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const history=useHistory();
    const elements=useElements();
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(() => {
        const getClientSecret=async () => {
            const response=await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket])
    console.log(clientSecret);
     const handleSubmit = async(event) => {
         event.preventDefault();
         setProcessing(true);
         const payload=await stripe.confirmCardPayment(clientSecret,{
             payment_method:{
                 card:elements.getElement(CardElement)
             }
         }).then(({paymentIntent}) => {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
             setSucceeded(true);
             setError(null);
             setProcessing(false);
             dispatch({
                 type:'EMPTY_BASKET'
             })
             history.replace('/orders');

         })
     } 
     const handleChange = event =>{
         setDisabled(event.empty);
         setError(event.error ? event.error.message :"");
     }

    return (
           <div className="payment">
               <div className="payment__container">
                   <div className="payment__section">
                      <div className="payment__title">
                          <h3>Delivery Address</h3>
                      </div>
                      <div className="payment__address">
                          <strong>{user?.email}</strong> <br></br>
                          307,Green Park Lane
                          South Delhi
                      </div>
                   </div>
                   <div className="payment__section">
                      <div className="payment__title">
                          <h3>Review Items and Delivery</h3>
                      </div>
                      <div className="payment__items">
                          {basket.map(item => (
                              <CheckoutProduct
                                  id={item.id}
                                  title={item.title}
                                  image={item.image}
                                  price={item.price}
                                  rating={item.rating}
                              />    
                          ))}
                      </div>
                   </div>
                   <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                                <div className="payment__pricecontainer">
                                <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Order Total : <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
            <button disabled={processing || disabled || succeeded}>
                <span>
                    {processing ? <p>Processing</p>: "Buy Now"}
                </span>
            </button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>

                        </div>

                   </div>               
                </div>
           </div>
    )
}

export default Payment
