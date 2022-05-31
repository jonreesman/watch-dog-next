import React from 'react'
import Tweet from './Tweet'
import styles from '../styles/TweetList.module.css'

const TweetList = ({tweets}) => {
  return (
    <div className={styles.grid}>
        {tweets.map((tweet) => {
            return <Tweet key={tweet.ID} tweet={tweet}/>
        })}
    </div>
  )
}

export default TweetList