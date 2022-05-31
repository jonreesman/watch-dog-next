import React from 'react'
import styles from '../styles/Ticker.module.css'


const Ticker = ({item, onClick}) => {
  return (
    <div className={styles.container} onClick={onClick}>
        <p className={styles.text}>{item.Name}</p>
    </div>

  )
}

export default Ticker;