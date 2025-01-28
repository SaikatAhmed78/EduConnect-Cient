import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import useAxiosUser from '../../../Hooks/useAxiosUser';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({sessionId: booksessionId}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [sessionAmount, setSessionAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    const {user, sessionId} = useAuth();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const axiosUser = useAxiosUser();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosUser.post(`/create-payment-intent`, { price: sessionAmount });
                const data = await res?.data?.clientSecret;
                setClientSecret(data);
            } catch (err) {
                console.error('Error fetching client secret:', err);
                setErrorMessage('Failed to load payment details. Please try again.');
            }
        };

        if (sessionAmount) {
            fetchData();
        }
    }, [sessionAmount, axiosUser]);

  
    const handleConfirmPayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            setErrorMessage('Please enter valid card details.');
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setErrorMessage(confirmError.message);
            } else if (paymentIntent.status === 'succeeded') {
                setErrorMessage('');
                Swal.fire({
                    title: "Congratulations 🎉",
                    text: `Payment succesfull`,
                    icon: "success"
                });

              const bookedSessionsF = async() => {
                
                try{
                    const res = await axiosUser.post(`postData/${booksessionId}`)
                    const data = await res.data;
                   
                }
                catch(err){console.log(err)}

            }
            bookedSessionsF();

                const postPaymentInfo = async() => {
                    try{
                        const res = await axiosUser.patch(`/sessions/${sessionId}/payment-approved`);
                        const data = await res?.data;
                        console.log('Payment info set to the db:', data);
                        

                    }catch(err){
                        console.error(err);
                    }
                };
                postPaymentInfo();
                
                
            }
        }
    };

    

    return (
        <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-300">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Payment Details</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Amount</label>
                <input
                    type="number"
                    value={sessionAmount}
                    onChange={(e) => setSessionAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 shadow-sm"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <CardElement className="w-full px-4 py-3 border rounded-lg shadow-sm" />
            </div>

            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

            <div className="flex justify-between items-center">
                
                <button
                    type="submit"
                    onClick={handleConfirmPayment}
                    className="bg-blue-500 text-white px-5 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 shadow-md"
                >
                    <AiOutlineCheckCircle /> Confirm Payment
                </button>
            </div>
        </div>
    );
};

export default CheckoutForm;
