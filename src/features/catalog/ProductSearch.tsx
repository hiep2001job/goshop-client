import { TextField, debounce } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { setProductParams } from './catalogSlice';

const ProductSearch = () => {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const deboundSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000);

    return (
        <TextField
            label='Search Products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event:any)=>{
                setSearchTerm(event.target.value);
                deboundSearch(event);
            }}
        />
    )
}

export default ProductSearch