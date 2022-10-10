import React from 'react'
import { useMantineTheme, Container, Card, Text } from '@mantine/core';
import styles from '../styles/Tweet.module.css'

const Tweet = ({tweet}) => {
  const theme = useMantineTheme();
  return (
    <Container fluid px="xs">
      <a href={tweet.PermanentURL} className={styles.link}>
        <Card shadow="sm" p="lg" style={{ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[4]}}>
          <Text size="sm">{tweet.Expression}</Text>
          <Text size="xs">Likes: {tweet.Likes} Replies: {tweet.Replies} Retweets {tweet.Retweets}</Text>
          <Text size="xs">Sentiment Score: {tweet.Polarity}</Text>
          <Text>Spam: {tweet.Spam ? "Spam" : "Ham"}</Text>
        </Card>
      </a>
    </Container>
  )
}

export default Tweet