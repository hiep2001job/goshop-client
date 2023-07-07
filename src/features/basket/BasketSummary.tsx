import { TableContainer, Paper, Table, TableRow, TableCell, TableBody } from '@mui/material';
import { currencyFormat } from '../../app/util/util';
import { useAppSelector } from '../../store/configureStore';

interface Props{
    subtotal?:number;
}

const BasketSummary = ({subtotal}:Props) => {    
    const {basket}=useAppSelector(state=>state.basket);
    if(subtotal===undefined)
         subtotal = basket?.items.reduce((total, item) => total + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <TableContainer sx={{ mt: 2 }} component={Paper} variant='outlined'>
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
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