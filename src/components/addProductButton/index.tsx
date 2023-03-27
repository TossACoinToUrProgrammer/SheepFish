import React from 'react'
import { useNavigate } from 'react-router'

import styles from './styles.module.scss'

const AddProductButton = () => {
    const navigate = useNavigate()
    return (
        <button className={styles.button} onClick={() => navigate('add-product')}>Add Product +</button>
    )
}

export default AddProductButton