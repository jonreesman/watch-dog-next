import React from 'react'
import Interval from './Interval'
import styles from '../styles/IntervalList.module.css'

const IntervalList = ({setTimeframe}) => {
  return (
    <div className={styles.grid}>
        <Interval text={"Day"} onClick={() => {
            setTimeframe("day")
            }} />
        <Interval text={"Week"} onClick={() => {
            setTimeframe("week")
            }} />
        <Interval text={"Month"} onClick={() => {
            setTimeframe("month")
            }} />
        <Interval text={"2 Months"} onClick={() => {
            setTimeframe("2month")
            }} />
    </div>
  )
}

export default IntervalList