import { Grid } from '@mui/material'
import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'
import { useAppSelector } from '../../store/configureStore'
import ProductCardSkeleton from './ProductCartSkeleton'

interface Props {
    products: Product[],

}
const ProductList = ({ products }: Props) => {
    const { productsLoaded } = useAppSelector(state => state.catalog);
    return (

        <Grid container spacing={4} >
            {products.map(product =>
                <Grid key={product.id} item xs={3}>
                    {!productsLoaded
                        ? <ProductCardSkeleton />
                        : <ProductCard key={product.id} product={product} />
                    }

                </Grid>

            )}
        </Grid>
    )
}

export default ProductList