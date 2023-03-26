import React from 'react'

import { IProduct } from 'models'
import styles from './styles.module.scss'
import cn from 'classnames'

interface ProductsListProps {
    products: IProduct[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    if (!products.length) {
        <div>No results</div>
    }

    return (
        <ul className={styles.table}>
            <li className={styles.row}>
                <div className={cn(styles.cell, styles.id)}>ID</div>
                <div className={styles.cell}>Product Name</div>
                <div className={cn(styles.cell, styles.img)}>Picture</div>
                <div className={styles.cell}>Description</div>
                <div className={cn(styles.cell, styles.smCell)}>Stock</div>
                <div className={cn(styles.cell, styles.mdCell)}>Category</div>
                <div className={cn(styles.cell, styles.smCell)}>Price</div>
            </li>
            {products.map((product) => <li key={product.id} className={styles.row}>
                <div className={cn(styles.cell, styles.id)}>{product.id}</div>
                <div className={styles.cell}>{product.title}</div>
                <div className={cn(styles.cell, styles.img)}> <img src={product.thumbnail || product.images[0]} alt='phone image' /></div>
                <div className={styles.cell}>{product.description}</div>
                <div className={cn(styles.cell, styles.smCell)}>{product.stock}</div>
                <div className={cn(styles.cell, styles.mdCell)}>{product.category}</div>
                <div className={cn(styles.cell, styles.smCell)}>{product.price}</div>
            </li>)}
        </ul>
    )
}

export default ProductsList