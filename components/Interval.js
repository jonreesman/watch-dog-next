import React from 'react'
import styles from '../styles/IntervalList.module.css'

const Interval = ({text, onClick}) => {
  return (
    <div className={styles.interval} onClick={onClick}>
        <p className={styles.text}>{text}</p>
    </div>
  )
}


export default Interval