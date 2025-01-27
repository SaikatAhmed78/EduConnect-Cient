import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { BsBank, BsCreditCard } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";




const stripePromise = loadStripe(import.meta.env.VITE_PK_KEY);

const Payment = () => {


    const [error, setError] = useState('');
    const location = useLocation();
    const { amount } = location.state || {}



    return (
        <div className="flex items-center justify-center">

            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;
