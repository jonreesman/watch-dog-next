import React from 'react'
import styles from '../styles/Tweet.module.css'

const Tweet = ({tweet}) => {
  return (
    <div className={styles.container}>
      <a href={tweet.PermanentURL} className={styles.link}>
        <p>{tweet.Expression}</p>
        <p>Sentiment Score: {tweet.Polarity}</p>
      </a>
    </div>
  )
}

export default Tweet