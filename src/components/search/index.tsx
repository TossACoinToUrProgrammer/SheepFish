import { useActions } from 'hooks/useActions'
import React, { useState } from 'react'

import styles from './styles.module.scss'

const Search = () => {
    const { setSearch } = useActions()
    const [searchText, setSearchText] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        setSearch(e.target.value)
    }

    return (
        <div className={styles.inputWrapper}>
            <input value={searchText} placeholder="Search..." onChange={onChangeHandler} />
        </div>
    )
}

export default Search