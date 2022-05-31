import React from 'react'
import TweetEmbed from 'react-tweet-embed'
import styles from '../styles/Tweet.module.css'

const Tweet = ({tweet}) => {
  //<TweetEmbed tweetId={tweetId}/>
  return (
    <div className={styles.container}>
      <a href={tweet.PermanentURL}>
        <p>{tweet.Expression}</p>
        <p>Sentiment Score: {tweet.Polarity}</p>
      </a>
    </div>
  )
}

export default Tweet