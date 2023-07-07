import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutPage from './CheckoutPage'
import { loadStripe } from '@stripe/stripe-js'
import { useAppDispatch } from '../../store/configureStore';
import agent from '../../app/api/agent';
import { setBasket } from '../basket/basketSlice';
import Loading from '../../app/layout/Loading';

const stripePromise=loadStripe('pk_test_51MptT0Ai3loYImaGf3goYdY3U7sbbgjqx77Tr48Z8Xiw4L9t503wpF4owAB94JnNdMTZCQHdpakZo1v1rySzfYPo00tt9NWtXh');



const CheckoutWrapper = () => {

  const dispatch =useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payment.createPaymentIntent()
    .then(basket=>dispatch(setBasket(basket)))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false));
  
  }, [dispatch])

  if(loading) return <Loading message='Loading checkout...' />

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage/>
    </Elements>
  )
}

export default CheckoutWrapper