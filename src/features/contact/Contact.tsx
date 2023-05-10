import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { decrement, increment } from './counterSlice';

const Contact = () => {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector(state => state.counter);


  return (
    <>
      <Typography variant='h2'>
        {title}
      </Typography>
      <Typography variant='h5'>
        The data is: {data}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decre</Button>
        <Button onClick={() => dispatch(increment(1))} variant='contained' color='error'>Incre</Button>
        <Button onClick={() => dispatch(decrement(5))} variant='contained' color='error'>Decre by 5</Button>
      </ButtonGroup>

    </>
  )
}

export default Contact