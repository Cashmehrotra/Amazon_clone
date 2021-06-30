const functions = require('firebase-functions');
const express=require('express');
const cors=require('cors');
const stripe=require('stripe')
('sk_test_51I2XmTGPdgRFTPqOA5BsAjjigRB7bTqYP3fYMtWxMx04uG5TxRfKOPrHAdFwY99o0bfayVsDkogsFzB173Z8jIIy00t19lA22Q');

const app=express();
app.use(cors({origin:true}));
app.use(express.json());
app.get('/',(req,res) => res.status(200).sendY('hello world'));
app.post('/payments/create', async (req,res) => {
    const total=req.query.total;
    console.log("payment made >> ",total);
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"inr",
    });
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    });
});
 exports.api=functions.https.onRequest(app);
//  http://localhost:5001/clone-47a4b/us-central1/api
