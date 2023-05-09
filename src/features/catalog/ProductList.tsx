import { Grid } from '@mui/material'
import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'

interface Props {
    products: Product[],
    
}
const ProductList = ({ products }: Props) => {
    return (
        <Grid container spacing={4} >
            {products.map(product =>
                <Grid key={product.id} item xs={3}>
                    <ProductCard key={product.id} product={product} />
                </Grid>

            )}
        </Grid>
    )
}

export default ProductList