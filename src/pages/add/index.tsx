import React from 'react'
import ProductForm from 'components/productForm'
import { useActions } from 'hooks/useActions'
import { Link } from 'react-router-dom'
import { IProduct } from 'shared/models'
import Container from 'shared/ui/container'

const AddProductPage = () => {
    const { addProductThunk } = useActions()

    const submitHandler = async (values: IProduct) => {
        addProductThunk(values)
    }

    return (
        <Container>
            <Link to={'/'} preventScrollReset={true}>{'<'} Back</Link>
            <h1>Add Product</h1>

            <ProductForm onSubmit={submitHandler} buttonText={'Add'} />
        </Container>
    )
}
export default AddProductPage
