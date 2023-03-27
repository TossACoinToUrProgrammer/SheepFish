import React, { useEffect, useRef } from 'react'
import cn from 'classnames'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { useActions } from 'hooks/useActions'
import styles from './styles.module.scss'

const Message = () => {
    const { message, error } = useTypedSelector(state => state.products)
    const { setMessage, setError } = useActions()
    const timeoutRef = useRef<any>()

    useEffect(() => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setMessage('')
            setError('')
        }, 5000)
        
        return () => clearTimeout(timeoutRef.current)
    }, [message, error])

    return (
        <div className={cn({[styles.popup]: message || error, [styles.error]: !!error, [styles.message]: !!message })}>{message || error}</div>
    )
}

export default Message