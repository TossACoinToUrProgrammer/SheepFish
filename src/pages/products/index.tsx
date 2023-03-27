import React, { useEffect, useState } from 'react'

import ProductsList from 'components/productsList'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import Filters from 'components/filters'
import Container from 'shared/ui/container'
import { IProduct } from 'shared/models'
import Search from 'components/search'
import styles from './styles.module.scss'
import AddProductButton from 'components/addProductButton'


const ProductsPage = () => {
    const { products, isLoading, filters, categories, search } = useTypedSelector(state => state.products)
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

        if (!filters.category && !filters.price && !search) {
            setFilteredProducts(filtered)
            return
        }

        filtered = filtered.filter(item => {
            if (filters.category && item.category !== filters.category) {
                return false
            }

            if (filters.price) {
                if (filters.price!.min && item.price < filters.price!.min) {
                    return false
                }

                if (filters.price!.max && filters.price!.max < item.price) {
                    return false
                }
            }

            if (search) {
                const lowerCaseSearch = search.toLowerCase()

                if (
                    !item.title.toLowerCase().includes(lowerCaseSearch) &&
                    !item.category.toLowerCase().includes(lowerCaseSearch)
                ) {
                    return false
                }
            }

            return true
        })

        setFilteredProducts(filtered)
    }, [products, filters, search])

    return (
        <Container>
            <h1>Phone Store</h1>

            <div className={styles.filters}><Filters categories={categories} /> <Search /></div>
            <div>{filteredProducts && <ProductsList products={filteredProducts} />}</div>
            <AddProductButton />
        </Container>
    )
}

export default ProductsPage
