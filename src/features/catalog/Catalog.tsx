import  {  useEffect, useState } from 'react'
import { Product } from '../../app/models/product'
import ProductList from './ProductList'

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('https://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));

    }, [])

    function addProduct() {
        setProducts(prevState => [...prevState,
        {
            id: prevState.length + 101,
            name: 'product ' + prevState.length + 1,
            price: (prevState.length * 100) + 100,
            brand: 'some brand',
            description: 'some discription',
            pictureUrl: 'http://picsum.photos/200',

        }])
    }
    return (
        <ProductList products={products} />

    )
}

export default Catalog