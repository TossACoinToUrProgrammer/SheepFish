import cn from 'classnames'
import React from 'react'

import styles from './styles.module.scss'

interface SortArrowsProps {
    isActive: boolean,
    increase: boolean
}

const SortArrows: React.FC<SortArrowsProps> = ({ isActive, increase }) => {
    return (
        <div className={cn(styles.arrowWrapper, { [styles.top]: isActive && increase, [styles.bottom]: isActive && !increase })}></div>
    )
}

export default SortArrows