import React, { useState, useEffect } from 'react'

import ProductForm from 'components/productForm'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useParams } from 'react-router'
import Container from 'shared/ui/container'

import styles from './styles.module.scss'
import { IProduct } from 'shared/models'
import { Link } from 'react-router-dom'

const EditPage = () => {
    const params = useParams()
    const { products } = useTypedSelector(state => state.products)
    const { updateProductThunk, fetchProducts } = useActions()
    const [currentProduct, setCurrentProduct] = useState<IProduct>()

    useEffect(() => {
        if (!params.productId) return
        const productId = params.productId as string

        if (!products) {
            fetchProducts()
            return
        }

        setCurrentProduct(products.find(item => Number(productId) === item.id))
    }, [products, params])

    const submitHandler = async (values: IProduct) => {
        updateProductThunk(values)
    }

    return (
        <Container>
            <Link to={'/'} preventScrollReset={true}>{'<'} Back</Link>
            <h1>Edit Product</h1>

            {currentProduct && <ProductForm onSubmit={submitHandler} buttonText={'Edit'} initialValues={currentProduct} />}
        </Container>
    )
}

export default EditPage