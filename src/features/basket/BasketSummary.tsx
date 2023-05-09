import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react'
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

const BasketSummary = () => {
    const { basket } = useStoreContext();
    const subTotal = basket?.items.reduce((total, item) => total + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subTotal > 10000 ? 0 : 500;

    return (
        <TableContainer sx={{ mt: 2 }} component={Paper} variant='outlined'>
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{currencyFormat(subTotal + deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <span style={{ fontStyle: 'italic' }}>*Order over $100 qualify for free delivery fee</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasketSummary