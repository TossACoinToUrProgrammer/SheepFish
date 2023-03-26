import React, { useEffect, useState } from 'react'

import ProductsList from 'components/productsList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'

const ProductsPage = () => {
    const { products, isLoading } = useTypedSelector(state => state.products)
    const { fetchProducts } = useActions()
    

    useEffect(() => {
        if (!products) {
            fetchProducts()
        }
    }, [])

    return (
        <div>
            {isLoading && "Loading..."}
            <h1>Phone Store</h1>

            <div>Categories</div>
            <div>Search</div>
            <div>{products && <ProductsList products={products} />}</div>
        </div>
    )
}

export default ProductsPage
