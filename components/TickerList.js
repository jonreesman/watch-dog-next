import React, { useEffect } from 'react'
import Ticker from './Ticker'
import styles from '../styles/TickerList.module.css'

const TickerList = ({results, setTicker}) => {
  return (
    <div className={styles.grid}>
        {results.map(item => {
          return (
            <Ticker key={item.Id} item={item} onClick={()=> {
              console.log(item)
              setTicker(item.Id, )}
            } />
          )
        })}
    </div>
  )
}

export default TickerList