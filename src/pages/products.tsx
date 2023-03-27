import React, { useEffect, useState } from 'react'

import ProductsList from 'components/productsList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import Filters from 'components/filters'
import Container from 'shared/ui/container'
import { IProduct } from 'shared/models'

const ProductsPage = () => {
    const { products, isLoading, filters, categories } = useTypedSelector(state => state.products)
    const { fetchProducts, fetchCategories } = useActions()

    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>()

    useEffect(() => {
        if (!categories) {
            fetchCategories()
        }
        if (!products) {
            fetchProducts()
        }
    }, [])

    useEffect(() => {
        if (!products) return

        let filtered = [...products]

        if (!filters.category || !filters.price) setFilteredProducts(filtered)

        if (filters.category) {
            filtered = filtered.filter(item => item.category === filters.category)
        }

        if (filters.price) {
            filtered = filtered.filter(item => {
                if (filters.price!.min && item.price < filters.price!.min) {
                    return false
                }

                if (filters.price!.max && filters.price!.max < item.price) {
                    return false
                }

                return true
            })
        }

        setFilteredProducts(filtered)
    }, [products, filters])

    return (
        <Container>
            {isLoading && "Loading..."}
            <h1>Phone Store</h1>

            <div>{categories && <Filters categories={categories} />}</div>
            <div>Search</div>
            <div>{filteredProducts && <ProductsList products={filteredProducts} />}</div>
        </Container>
    )
}

export default ProductsPage
