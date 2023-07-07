import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { validationSchema } from './checkoutValidation';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { clearBasket } from '../basket/basketSlice';
import { LoadingButton } from '@mui/lab';
import { StripeElementType } from '@stripe/stripe-js';
import {  CardElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';


const steps = ['Shipping address', 'Payment details', 'Review your order'];


export default function CheckoutPage() {

  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [cardState, setCardState] = useState<{ elementError: { [key in StripeElementType]?: string } }>({ elementError: {} });
  const [cardComplete, setCardComplete] = useState<any>({ cardNumber: false, cardExpiry: false, cardCvc: false })

  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { basket } = useAppSelector(state => state.basket);
  const stripe = useStripe();
  const elements = useElements();

  function onCardInputChange(event: any) {
    setCardState({
      ...cardState,
      elementError: {
        [event.elementType]: event.error?.message
      }
    })
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete })
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm onCardInputChange={onCardInputChange} cardState={cardState} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema)
  });

  useEffect(() => {
    agent.Account.fetchUserAddress()
      .then(response => {
        if (response) {
          methods.reset({
            ...methods.getValues(),
            ...response,
            saveAddress: false
          })
        }
      });
  }, [methods])

  async function submitOrder(data: FieldValues) {
    setLoading(true);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (!stripe || !elements) return; //Stripe is not ready
    try {
      const cardElement = elements.getElement(CardElement);
      console.log('strip',stripe);
      console.log('el',elements);
      console.log('card el',cardElement);
      const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
        payment_method: {      
          card: cardElement!,
          billing_details: {
            name: nameOnCard
          }
        }
      });
      console.log(paymentResult);
      if (paymentResult.paymentIntent?.status === 'succeeded') {
        const orderNumber = await agent.Order.create({ saveAddress, shippingAddress });
        setOrderNumber(orderNumber);
        setPaymentSuccess(true);
        setPaymentMessage('Thank you, we have received your payment');
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      } else {
        setPaymentMessage(paymentResult.error?.message!);
        setPaymentSuccess(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function submitDisabled(): boolean {
    if (activeStep === steps.length - 1) {
      return Object.values(cardComplete).some(value => value === false)
        || !methods.formState.isValid
    } else {
      return !methods.formState.isValid
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              {paymentMessage}
            </Typography>
            {paymentSuccess ? 
            (<Typography variant="subtitle1">
              Your order number is #{orderNumber}. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>)
              :(<Button variant='contained' onClick={handleBack}>Go back and try again</Button>)
            }

          </React.Fragment>
        ) : (
          <form onSubmit={methods.handleSubmit(handleNext)}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <LoadingButton
                loading={loading}
                disabled={submitDisabled()}
                variant="contained"
                type='submit'
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </LoadingButton>
            </Box>
          </form>
        )}
      </Paper>
    </FormProvider>
  );
}


