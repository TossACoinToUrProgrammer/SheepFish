import React from 'react'

import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import styles from './styles.module.scss'

interface FiltersProps {
    categories: string[]
}

const Filters: React.FC<FiltersProps> = ({ categories }) => {
    const { filters } = useTypedSelector(state => state.products)
    const { setFilters } = useActions()

    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'all') {
            setFilters({ ...filters, category: undefined })
        } else {
            setFilters({ ...filters, category: e.target.value })
        }
    }

    const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters, price: {
                ...filters.price,
                min: Number(e.target.value)
            }
        })
    }

    const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters, price: {
                ...filters.price,
                max: Number(e.target.value)
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Filters</h3>
            <div className={styles.filters}>
                <select onChange={onCategoryChange}>
                    <option placeholder='Filters' value={'all'}>All Categories</option>
                    {categories.map(category =>
                        <option value={category} key={category}>{category}</option>
                    )}
                </select>
                <input type="number" placeholder='Min Price' onChange={onMinPriceChange} />
                <input type="number" placeholder='Max Price' onChange={onMaxPriceChange} />
            </div>
        </div>
    )
}

export default Filters