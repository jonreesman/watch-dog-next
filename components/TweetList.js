import React from 'react'
import { Text, Container, Center, Loader } from '@mantine/core';
import Tweet from './Tweet'
import styles from '../styles/TweetList.module.css'

const TweetList = ({tweets}) => {
  if (tweets === undefined || tweets === null) {
    return (
      <Container style={{ position: 'fixed', top: '50%', left: '50%' }}>
        <Center style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Loader size="lg"/>
          <Text size="md">Loading tweets...</Text>
        </Center>
      </Container>
    )
  }
  return (
    <div className={styles.grid}>
        {tweets.map((tweet) => {
            return <Tweet key={tweet.ID} tweet={tweet}/>
        })}
    </div>
  )
}

export default TweetList