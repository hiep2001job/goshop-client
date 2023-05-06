import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'

interface Props {
    products: Product[],
    
}
const ProductList = ({ products }: Props) => {
    return (
        <Grid container spacing={4} >
            {products.map(product =>
                <Grid item xs={3}>
                    <ProductCard key={product.id} product={product} />
                </Grid>

            )}
        </Grid>
    )
}

export default ProductList