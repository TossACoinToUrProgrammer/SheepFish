import React from 'react'
import { Field, Formik } from "formik"
import * as Yup from "yup"

import { IProduct } from 'shared/models'
import styles from './styles.module.scss'
import cn from 'classnames'

interface ProductFromInterface {
    onSubmit: (props: any) => void,
    buttonText: string,
    initialValues?: IProduct
}

const ValidationSchema = Yup.object().shape({
    title: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    price: Yup.number().required("Required"),
    rating: Yup.number(),
    thumbnail: Yup.string()
})

const ProductForm: React.FC<ProductFromInterface> = ({ initialValues, onSubmit, buttonText }) => {
    const getId = () => {
        return ~~String((new Date()).getTime()).slice(0,3)
    }
    return (
        <Formik
            initialValues={
                initialValues || { id: getId(), title: "", description: '', price: 0, discountPercentage: 0, rating: 0, stock: 0, brand: '', category: '', thumbnail: '', images: [] }
            }
            validationSchema={ValidationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="title">Title:</label>
                    <input
                        className={styles.field}
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {errors.title && touched.title && <span className={styles.error}>{errors.title}</span>}

                    <label htmlFor="price">Price:</label>
                    <input
                        className={styles.field}
                        type="number"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                    />
                    {errors.price && touched.price && <span className={styles.error}>{errors.price}</span>}

                    <label htmlFor="thumbnail">Thumbnail:</label>
                    <input
                        className={styles.field}
                        type="text"
                        name="thumbnail"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.thumbnail}
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        className={cn(styles.field, styles.textArea)}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                    />
                    <button className={styles.submit} type="submit" disabled={isSubmitting}>
                        {buttonText}
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default ProductForm