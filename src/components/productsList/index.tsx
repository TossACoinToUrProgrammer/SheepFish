import React, { useEffect, useState } from 'react'

import { IProduct } from 'shared/models'
import styles from './styles.module.scss'
import cn from 'classnames'
import SortArrows from './SortArrows'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'hooks/useActions'
import deleteIcon from 'assets/icons/delete.svg'
import editIcon from 'assets/icons/edit-square.svg'

interface Sort { key: keyof IProduct, inc?: boolean }

interface ProductsListProps {
    products: IProduct[]
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    const navigate = useNavigate()
    const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products)
    const [sort, setSort] = useState<Sort>()
    const { deleteProductThunk } = useActions()

    const sortBy = (key: keyof IProduct) => {
        setSort(prev => {
            if (prev && prev.key === key) {
                if (prev.inc !== false) {
                    return { key, inc: !prev.inc }
                }
                else {
                    return undefined
                }
            }

            return { key, inc: true }
        })
    }

    useEffect(() => {
        if (!sort) {
            setSortedProducts(products)
            return
        }

        const { inc, key } = sort

        const sorted = [...products]
        sorted.sort((a, b) => {
            const bool = inc ? (a[key] > b[key]) : (a[key] < b[key])

            // reverse sort for string fields, to match a-z
            if (typeof a[key] === 'number') {
                return bool ? -1 : 0
            }
            return !bool ? -1 : 0
        })

        setSortedProducts(sorted)
    }, [sort, products])

    const deleteHandler = (id: number) => {
        deleteProductThunk(id)
    }

    if (products.length === 0) {
        return <div>No results</div>
    }

    return (
        <ul className={styles.table}>
            <li className={cn(styles.row, styles.header)}>
                <div className={cn(styles.cell, styles.id, styles.sort)} onClick={() => sortBy('id')}>ID<SortArrows isActive={sort?.key === 'id'} increase={!!sort?.inc} /></div>
                <div className={cn(styles.cell, styles.sort)} onClick={() => sortBy('title')}>Product Name<SortArrows isActive={sort?.key === 'title'} increase={!!sort?.inc} /></div>
                <div className={cn(styles.cell, styles.img)}>Picture</div>
                <div className={styles.cell}>Description</div>
                <div className={cn(styles.cell, styles.smCell, styles.sort)} onClick={() => sortBy('rating')}>Rating<SortArrows isActive={sort?.key === 'rating'} increase={!!sort?.inc} /></div>
                <div className={cn(styles.cell, styles.smCell, styles.sort)} onClick={() => sortBy('stock')}>Stock<SortArrows isActive={sort?.key === 'stock'} increase={!!sort?.inc} /></div>
                <div className={cn(styles.cell, styles.mdCell, styles.sort)} onClick={() => sortBy('category')}>Category<SortArrows isActive={sort?.key === 'category'} increase={!!sort?.inc} /></div>
                <div className={cn(styles.cell, styles.smCell, styles.sort)} onClick={() => sortBy('price')}>Price<SortArrows isActive={sort?.key === 'price'} increase={!!sort?.inc} /></div>
            </li>
            {sortedProducts.map((product) => <li key={product.id} className={styles.row}>
                <div className={cn(styles.cell, styles.id)}>{product.id}</div>
                <div className={styles.cell}>{product.title}</div>
                <div className={cn(styles.cell, styles.img)}> <img src={product.thumbnail || product.images[0]} alt='phone image' /></div>
                <div className={styles.cell}>{product.description}</div>
                <div className={cn(styles.cell, styles.smCell)}>{product.rating}</div>
                <div className={cn(styles.cell, styles.smCell)}>{product.stock}</div>
                <div className={cn(styles.cell, styles.mdCell)}>{product.category}</div>
                <div className={cn(styles.cell, styles.smCell)}>{product.price}</div>
                <div className={styles.buttons}>
                    <button onClick={() => navigate(`edit/${product.id}`)}><img src={editIcon} /></button>
                    <button onClick={() => deleteHandler(product.id)}><img src={deleteIcon} /></button>
                </div>
            </li>)}
        </ul>
    )
}

export default ProductsList