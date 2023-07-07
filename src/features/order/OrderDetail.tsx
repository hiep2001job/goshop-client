import React from 'react'
import { Order } from '../../app/models/order';
import { Box, Button, Grid, Typography } from '@mui/material';
import BasketTable from '../basket/BasketTable';
import { BasketItem } from '../../app/models/basket';
import BasketSummary from '../basket/BasketSummary';

interface Props{
    order:Order;
    setSelectedOrderNumber:(id:number)=>void;
}

const OrderDetail = ({order,setSelectedOrderNumber}:Props) => {
    const subtotal=order.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0) ?? 0;
    return (
    <>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Typography sx={{p:2}} gutterBottom variant='h4'>#Order #{order.id}-{order.orderStatus}</Typography>
            <Button onClick={()=>setSelectedOrderNumber(0)} sx={{m:2}} size='large' variant='contained'>Back</Button>
        </Box>
        <BasketTable items={order.orderItems as BasketItem[]}/>
        <Grid container>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <BasketSummary subtotal={subtotal}/>
            </Grid>

        </Grid>
    </>
  )
}

export default OrderDetail