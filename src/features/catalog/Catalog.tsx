import { useEffect } from 'react'
import ProductList from './ProductList'
import Loading from '../../app/layout/Loading'
import { useAppDispatch, useAppSelector } from '../../store/configureStore'
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from './catalogSlice'
import { Grid, Paper } from '@mui/material'
import ProductSearch from './ProductSearch'
import RadioButtonGroup from '../../app/components/RadioButtonGroup'
import CheckboxButtons from '../../app/components/CheckboxButtons'
import AppPagination from '../../app/components/AppPagination'

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

const Catalog = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const { metaData, productParams, productsLoaded, filtersLoaded, brands, types } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <Loading message='Loading products...' />

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} sx={{ mb: 2 }}>
                {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                }

            </Grid>
        </Grid>

    )
}

export default Catalog